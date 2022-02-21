import React, { useState } from 'react';

import Translation from '../../../components/Translation';
import Wysiwyg from '../../../components/Wysiwyg/Wysiwyg';
import validate from '../../../utils/validate';
import InputImage from '../../../components/InputImage';
import PopupLoader from '../../../components/PopupLoader';
import InputSlug from '../../../components/InputSlug';

import CollectionType from '@strapi/icons/CollectionType';
import { useNotification } from '@strapi/helper-plugin';
import { ModalLayout, ModalBody, ModalHeader, ModalFooter } from '@strapi/design-system/ModalLayout';
import { Box } from '@strapi/design-system/Box';
import { Stack } from '@strapi/design-system/Stack';
import { Breadcrumbs, Crumb } from '@strapi/design-system/Breadcrumbs';
import { Typography } from '@strapi/design-system/Typography';
import { Divider } from '@strapi/design-system/Divider';
import { Grid, GridItem } from '@strapi/design-system/Grid';
import { TextInput } from '@strapi/design-system/TextInput';
import { Option, Select } from '@strapi/design-system/Select';
import { ToggleCheckbox } from '@strapi/design-system/ToggleCheckbox';
import { Button } from '@strapi/design-system/Button';
import { Textarea } from '@strapi/design-system/Textarea';
import SeoModal from "../../../components/SeoModal";


const Create = ({ data, onCreate, onClose }) => {
  const [ name, setName ] = useState('');
  const [ selectParent, setSelectParent ] = useState(null);
  const [ slug, setSlug ] = useState('');
  const [ published, setPublished ] = useState(false);
  const [ shortDescription, setShortDescription ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ metaTitle, setMetaTitle ] = useState('');
  const [ metaKeywords, setMetaKeywords ] = useState('');
  const [ metaDescription, setMetaDescription ] = useState('');
  const [ image, setImage ] = useState(null)

  const notification = useNotification()
  const [ errors, setErrors] = useState({});
  const [ loader, setLoader ] = useState(false)

  const submitButtonHandler = async () => {
    let { success, validateErrors } = validate(
      { name, slug, shortDescription, description, metaTitle, metaKeywords, metaDescription }
    );

    if (!success) {
      notification({ type: 'warning', message: 'Fill in all required fields' });
      setErrors(validateErrors);
      return
    }

    setLoader(true)
    await onCreate({
      name,
      parentCategory: selectParent,
      slug,
      image,
      shortDescription,
      description,
      metaTitle,
      metaDescription,
      metaKeywords,
      publishedAt: published,
    })
      .then((res) => {
        setLoader(false)
        if (!res.success) return setErrors(res.data);
        onClose()
      })
  }

  return (
    <ModalLayout onClose={ () => onClose() } labelledBy="Create">
      <ModalHeader>
        <Stack horizontal size={2}>
          <CollectionType/>
          <Breadcrumbs label="Category model, name field">
            <Crumb>
              <Translation id={'categories.title'} defaultMessage={'Categories'}/>
            </Crumb>
          </Breadcrumbs>
        </Stack>
      </ModalHeader>
      <PopupLoader loader={loader}>
        <ModalBody>
          <Box paddingTop={4} paddingBottom={3}>
            <Typography variant={'beta'}>
              <Translation id={'modal.input.title'} defaultMessage={'Base Data'}/>
            </Typography>
          </Box>
          <Divider/>
          <Box paddingTop={5}>
            <Grid gap={5}>
              <GridItem col={6}>
                <TextInput
                  label={ <Translation id={'modal.input.label.name'} defaultMessage={'Name'}/> }
                  name="name"
                  value={ name }
                  onChange={ e => setName(e.target.value) }
                  error={ errors.name }
                />
              </GridItem>
              <GridItem col={6}>
                <InputSlug
                  label={ <Translation id={'modal.input.label.slug'} defaultMessage={'Slug'}/> }
                  name='Slug'
                  value={ slug }
                  onChange={ setSlug }
                  relationName={ name }
                  id={ -1 }
                  url={ 'categories/create-slug' }
                  error={ errors.slug }
                />
              </GridItem>
              <GridItem col={12}>
                <InputImage
                  label={ <Translation id={'modal.input.label.image'} defaultMessage={'Image'}/> }
                  selectedAsset={ image }
                  deleteSelectedAsset={ () => setImage(null) }
                  onFinish={ (image) => setImage(...image) }
                />
              </GridItem>
              <GridItem col={12}>
                <Textarea
                  error={ errors.shortDescription }
                  label={ <Translation id={'modal.input.label.shortDescription'} defaultMessage={'Short Description'}/> }
                  name="shortDescription"
                  onChange={e => setShortDescription(e.target.value)}
                >
                  { shortDescription }
                </Textarea>
              </GridItem>
              <GridItem col={6}>
                <Select
                  label={ <Translation id={'modal.input.label.parent'} defaultMessage={'Parent'}/> }
                  placeholder={ <Translation id={'modal.input.label.parent'} defaultMessage={'Parent'}/> }
                  name='parent'
                  value={ selectParent }
                  onChange={ setSelectParent }
                  onClear={ () => setSelectParent(null) }
                >
                  {
                    data.map((entry) => {
                      return <Option value={ entry.id } key={entry.id}>{ entry.name }</Option>
                    })
                  }
                </Select>
              </GridItem>
              <GridItem col={6}>
                <Stack size={1}>
                  <Typography fontWeight={'bold'} variant={'pi'}>
                    { <Translation id={'modal.input.label.published'} defaultMessage={'Published'}/> }
                  </Typography>
                  <ToggleCheckbox
                    onLabel={'On'}
                    offLabel={'Off'}
                    checked={ published }
                    onChange={() => { setPublished(!published) }}
                  >
                    { <Translation id={'modal.input.label.published'} defaultMessage={'Published'}/> }
                  </ToggleCheckbox>
                </Stack>
              </GridItem>
              <GridItem col={12}>
                <Wysiwyg
                  disabled={ false }
                  label={ <Translation id={'modal.input.label.description'} defaultMessage={'Description'}/> }
                  value={ description }
                  name="rich-text"
                  onChange={ e => setDescription(e.target.value) }
                  error={ errors.description }
                />
              </GridItem>
            </Grid>
          </Box>
          <SeoModal
            metaTitle={ metaTitle }
            setMetaTitle={ setMetaTitle }
            metaKeywords={ metaKeywords }
            setMetaKeywords={ setMetaKeywords }
            metaDescription={ metaDescription }
            setMetaDescription={ setMetaDescription }
            errors={ errors }
          />
        </ModalBody>
        <ModalFooter
          startActions = { <Button onClick = { () => onClose() } variant="tertiary">
            { <Translation id={'modal.input.label.cancel'} defaultMessage={'Cancel'}/> }
          </Button> }
          endActions = { <Button onClick = { submitButtonHandler }>
            { <Translation id={'modal.input.label.finish'} defaultMessage={'Finish'}/> }
          </Button> }
        />
      </PopupLoader>
    </ModalLayout>
  );
}

export default Create;
