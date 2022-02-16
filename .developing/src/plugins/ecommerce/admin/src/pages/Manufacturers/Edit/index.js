import React, { useState } from 'react';

import CollectionType from '@strapi/icons/CollectionType';
import { useIntl } from 'react-intl';
import { ModalLayout, ModalBody, ModalHeader, ModalFooter } from '@strapi/design-system/ModalLayout';
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

import ImportSlug from '../../../components/InputSlug'
import validateCategories from '../../../utils/validate';
import Wysiwyg from '../../../components/Wysiwyg/Wysiwyg';
import InputImage from '../../../components/InputImage';
import getTrad from '../../../utils/getTrad';
import PopupLoader from '../../../components/PopupLoader';


const Edit = ({ data, onClose, onUpdateData }) => {
  const { formatMessage } = useIntl();
  const [ name, setName ] = useState(data.name);
  const [ slug, setSlug ] = useState(data.slug);
  const [ shortDescription, setShortDescription ] = useState(data.shortDescription);
  const [ description, setDescription ] = useState(data.description);
  const [ published, setPublished ] = useState(data.publishedAt);
  const [ image, setImage ] = useState(data.image);
  const [ metaTitle, setMetaTitle ] = useState(data.metaTitle);
  const [ metaKeywords, setMetaKeywords ] = useState(data.metaKeywords);
  const [ metaDescription, setMetaDescription ] = useState(data.metaDescription);

  const [ errors, setErrors] = useState({});
  const [ loader, setLoader ] = useState(false)

  const submitButtonHandler = () => {
    const { success, validateErrors } = validateCategories(
      { name, shortDescription, description, metaTitle, metaKeywords, metaDescription },
      errors, setErrors
    )
    if (success) {
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
        .then(res => {
          setLoader(false)
          if (res) onClose()
        });
    } else {
      setErrors(validateErrors)
    }
  }

  return (
    <ModalLayout onClose={ () => onClose() } labelledBy="Edit">
      <ModalHeader>
        <Stack horizontal size={2}>
          <CollectionType/>
          <Breadcrumbs label="Category model, name field">
            <Crumb>
              {
              formatMessage({
              id: getTrad('menu.manufacturers.name'),
              defaultMessage: 'Manufacturers',
            })}
            </Crumb>
            <Crumb>{ data.name }</Crumb>
          </Breadcrumbs>
        </Stack>
      </ModalHeader>
      <PopupLoader loader={loader}>
        <ModalBody>
          <Box paddingTop={4} paddingBottom={3}><Typography variant={'beta'}>Edit {data.name}</Typography></Box>
          <Divider/>
          <Box paddingTop={5}>
            <Grid gap={5}>
              <GridItem col={6}>
                <TextInput
                  placeholder='Name'
                  label='Name'
                  name='Name'
                  value={ name }
                  onChange={ e => setName(e.target.value) }
                  error={ errors.name }
                />
              </GridItem>
              <GridItem col={6}>
                <ImportSlug
                  placeholder='Slug'
                  label='Slug'
                  name='Slug'
                  value={ slug }
                  onChange={ setSlug }
                  relationName={ name }
                  id={ data.id }
                  url={ 'manufacturer/create-slug' }
                />
              </GridItem>
              <GridItem col={12}>
                <InputImage
                  label={'Image'}
                  error={''}
                  selectedAsset={image}
                  deleteSelectedAsset={() => setImage(null)}
                  onFinish ={(image) => setImage(...image)}/>
              </GridItem>
              <GridItem col={12}>
                <Textarea
                  error={ errors.shortDescription }
                  label="Short description"
                  name="shortDescription"
                  onChange={e => setShortDescription(e.target.value)}
                >
                  { shortDescription }
                </Textarea>
              </GridItem>
              <GridItem col={12}>
                <Wysiwyg
                  disabled={ false }
                  label={ 'Description' }
                  value={ description }
                  name="rich-text"
                  onChange={ e => setDescription(e.target.value) }
                  error={ errors.description }
                />
              </GridItem>
              <GridItem col={6}>
                <Stack size={1}>
                  <Typography fontWeight={'bold'} variant={'pi'}>Published</Typography>
                  <ToggleCheckbox onLabel={'On'} offLabel={'Off'} checked={ published } onChange={() => {setPublished(!published)}}>
                    Published
                  </ToggleCheckbox>
                </Stack>
              </GridItem>
            </Grid>
            <Box paddingTop={9} paddingBottom={3}><Typography variant={'beta'}>SEO</Typography></Box>
            <Divider/>
            <Box paddingTop={5}>
              <Grid gap={5}>
                <GridItem col={6}>
                  <TextInput
                    label="Meta_title"
                    name="metaTitle"
                    value={ metaTitle }
                    onChange={ e => setMetaTitle(e.target.value) }
                    error={ errors.metaTitle }
                  />
                </GridItem>
                <GridItem col={6}>
                  <TextInput
                    label="Meta_keywords"
                    name="metaKeywords"
                    value={ metaKeywords }
                    onChange={ e => setMetaKeywords(e.target.value) }
                    error={ errors.metaKeywords }
                  />
                </GridItem>
                <GridItem col={12}>
                  <Textarea error={ errors.metaDescription } label="Meta_description" name="metaDescription" onChange={e => setMetaDescription(e.target.value)}>
                    { metaDescription }
                  </Textarea>
                </GridItem>
              </Grid>
            </Box>
          </Box>
        </ModalBody>
        <ModalFooter
          startActions = { <Button onClick = { () => onClose() } variant="tertiary"> Cancel </Button> }
          endActions = { <Button onClick = { submitButtonHandler }> Finish </Button> }
        />
      </PopupLoader>
    </ModalLayout>
  );
}

export default Edit;
