import React, { useState } from "react";

import CollectionType from '@strapi/icons/CollectionType';
import { useNotification } from '@strapi/helper-plugin';
import { ModalLayout, ModalBody, ModalHeader, ModalFooter } from '@strapi/design-system/ModalLayout';
import { Box } from "@strapi/design-system/Box";
import { Stack } from "@strapi/design-system/Stack";
import { Breadcrumbs, Crumb } from '@strapi/design-system/Breadcrumbs';
import { Typography } from "@strapi/design-system/Typography";
import { Divider } from "@strapi/design-system/Divider";
import { Grid, GridItem } from "@strapi/design-system/Grid";
import { TextInput } from "@strapi/design-system/TextInput";
import { Button } from "@strapi/design-system/Button";
import { Textarea } from '@strapi/design-system/Textarea';
import { ToggleCheckbox } from '@strapi/design-system/ToggleCheckbox';

import Wysiwyg from "../../../components/Wysiwyg/Wysiwyg";
import validateCategories from "../../../utils/validate";
import InputImage from "../../../components/InputImage"

const Create = ({ data, onCreate, onClose }) => {
  const [ name, setName ] = useState('');
  const [ slug, setSlug ] = useState('');
  const [ shortDescription, setShortDescription ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ image, setImage ] = useState(undefined);
  const [ published, setPublished ] = useState(false);
  const [ metaTitle, setMetaTitle ] = useState('');
  const [ metaKeywords, setMetaKeywords ] = useState('');
  const [ metaDescription, setMetaDescription ] = useState('');

  const notification = useNotification()
  const [ errors, setErrors] = useState({});

  const submitButtonHandler = () => {
    let { success, validateErrors } = validateCategories(
      { name, shortDescription, description, metaTitle, metaKeywords, metaDescription },
      errors, setErrors);

    data.forEach(el => {
      if (el.name === name) {
        success = false;
        validateErrors = ( { ...validateErrors, name: 'This name is used'} );
      }
    })

    if (success) {
      onClose();
      onCreate({
        name,
        slug,
        image,
        publishedAt: published,
        shortDescription,
        description,
        metaTitle,
        metaDescription,
        metaKeywords,
      });
    } else {
      notification({ type: 'warning', message: 'Fill in all fields' })
      setErrors(validateErrors);
    }
  }

  return (
    <ModalLayout onClose={ () => onClose() } labelledBy="Create">
      <ModalHeader>
        <Stack horizontal size={2}>
          <CollectionType/>
          <Breadcrumbs label="Manufacturers model, name field">
            <Crumb>Manufacturers</Crumb>
          </Breadcrumbs>
        </Stack>
      </ModalHeader>
      <ModalBody>
        <Box paddingTop={4} paddingBottom={3}><Typography variant={'beta'}>Base data</Typography></Box>
        <Divider/>
        <Box paddingTop={5}>
          <Grid gap={5}>
            <GridItem col={6}>
              <TextInput
                placeholder="Name"
                label="Name"
                name="name"
                value={ name }
                onChange={ e => setName(e.target.value) }
                error={ errors.name }
              />
            </GridItem>
            <GridItem col={6}>
              <TextInput
                placeholder="Slug"
                label="Slug"
                name="slug"
                value={ slug }
                onChange={ e => setSlug(e.target.value) }
              />
            </GridItem>
            <GridItem col={6}>
              <Textarea error={ errors.shortDescription } label="Short description" name="shortDescription" onChange={e => setShortDescription(e.target.value)}>
                { shortDescription }
              </Textarea>
            </GridItem>
            <GridItem col={6}>
              <InputImage
                label={'Image'}
                selectedAsset={image}
                deleteSelectedAsset={() => setImage(null)}
                onFinish ={(image) => setImage(...image)}/>
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
        </Box>
        <Box paddingTop={5} paddingBottom={3}><Typography variant={'beta'}>SEO</Typography></Box>
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
      </ModalBody>
      <ModalFooter
        startActions = { <Button onClick = { () => onClose() } variant="tertiary"> Cancel </Button> }
        endActions = { <Button onClick = { submitButtonHandler }> Finish </Button> }
      />
    </ModalLayout>
  );
}

export default Create;
