import React, { useState } from 'react';

import InputSlug from '../../../components/InputSlug'
import validate from '../../../utils/validate';
import Wysiwyg from '../../../components/Wysiwyg/Wysiwyg';
import InputImage from '../../../components/InputImage';
import PopupLoader from '../../../components/PopupLoader';
import Translation from '../../../components/Translation';
import SeoModal from '../../../components/SeoModal';

import CollectionType from '@strapi/icons/CollectionType';
import { ModalLayout, ModalBody, ModalHeader, ModalFooter } from '@strapi/design-system/ModalLayout';
import { useNotification } from '@strapi/helper-plugin';
import { Box } from '@strapi/design-system/Box';
import { Stack } from '@strapi/design-system/Stack';
import { Breadcrumbs, Crumb } from '@strapi/design-system/Breadcrumbs';
import { Typography } from "@strapi/design-system/Typography";
import { Divider } from '@strapi/design-system/Divider';
import { TextInput } from '@strapi/design-system/TextInput';
import { Grid, GridItem } from '@strapi/design-system/Grid';
import { Button } from '@strapi/design-system/Button';
import { Textarea } from '@strapi/design-system/Textarea';
import { ToggleCheckbox } from '@strapi/design-system/ToggleCheckbox';


const Edit = ({ data, onClose, onUpdateData }) => {
  const [ name, setName ] = useState(data.name);
  const [ slug, setSlug ] = useState(data.slug);
  const [ shortDescription, setShortDescription ] = useState(data.shortDescription);
  const [ description, setDescription ] = useState(data.description);
  const [ published, setPublished ] = useState(!!data.publishedAt);
  const [ image, setImage ] = useState(data.image);
  const [ metaTitle, setMetaTitle ] = useState(data.metaTitle);
  const [ metaKeywords, setMetaKeywords ] = useState(data.metaKeywords);
  const [ metaDescription, setMetaDescription ] = useState(data.metaDescription);

  const notification = useNotification()
  const [ errors, setErrors] = useState({});
  const [ loader, setLoader ] = useState(false)

  const submitButtonHandler = () => {
    const { success, validateErrors } = validate(
      { name, shortDescription, description, metaTitle, metaKeywords, metaDescription }
    );

    if (!success) {
      notification({ type: 'warning', message: 'Fill in all required fields' })
      setErrors(validateErrors)
      return
    }

    setLoader(true)
    onUpdateData(data.id, {
      name,
      slug,
      shortDescription,
      description,
      image,
      metaTitle,
      metaDescription,
      metaKeywords,
    })
      .then((res) => {
        setLoader(false)
        if (!res.success) return setErrors(res.data);
        onClose()
      });
  }

  return (
    <ModalLayout onClose={ () => onClose() } labelledBy="Edit">
      <ModalHeader>
        <Stack horizontal size={2}>
          <CollectionType/>
          <Breadcrumbs label="Category model, name field">
            <Crumb>
              <Translation id={'manufacturers.title'} defaultMessage={'Manufacturers'}/>
            </Crumb>
            <Crumb>{ data.name }</Crumb>
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
                  name='Name'
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
                  id={ data.id }
                  url={ 'manufacturer/create-slug' }
                  error={ errors.slug }
                />
              </GridItem>
              <GridItem col={12}>
                <InputImage
                  label={ <Translation id={'modal.input.label.image'} defaultMessage={'Image'}/> }
                  error={''}
                  selectedAsset={ image }
                  deleteSelectedAsset={ () => setImage(null) }
                  onFinish ={ (image) => setImage(...image) }
                />
              </GridItem>
              <GridItem col={12}>
                <Textarea
                  error={ errors.shortDescription }
                  label={ <Translation id={'modal.input.label.shortDescription'} defaultMessage={'Short Description'}/> }
                  name="shortDescription"
                  onChange={ e => setShortDescription(e.target.value) }
                >
                  { shortDescription }
                </Textarea>
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
              <GridItem col={6}>
                <Stack size={1}>
                  <Typography fontWeight={'bold'} variant={'pi'}>
                    { <Translation id={'modal.input.label.published'} defaultMessage={'Published'}/> }
                  </Typography>
                  <ToggleCheckbox
                    onLabel={'On'}
                    offLabel={'Off'}
                    checked={ published }
                    onChange={ () => setPublished(!published) }
                  >
                    { <Translation id={'modal.input.label.published'} defaultMessage={'Published'}/> }
                  </ToggleCheckbox>
                </Stack>
              </GridItem>
            </Grid>
            <SeoModal
              metaTitle={ metaTitle }
              setMetaTitle={ setMetaTitle }
              metaKeywords={ metaKeywords }
              setMetaKeywords={ setMetaKeywords }
              metaDescription={ metaDescription }
              setMetaDescription={ setMetaDescription }
              errors={ errors }
            />
          </Box>
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

export default Edit;
