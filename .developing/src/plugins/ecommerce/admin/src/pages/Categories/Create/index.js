import React, { useState } from "react";

import Wysiwyg from "../../../components/Wysiwyg/Wysiwyg";
import validateCategories from "../../../utils/validate";
import InputImage from "../../../components/InputImage"
import getTrad from "../../../utils/getTrad";

import CollectionType from '@strapi/icons/CollectionType';
import { useIntl } from 'react-intl';
import { useNotification } from '@strapi/helper-plugin';
import { ModalLayout, ModalBody, ModalHeader, ModalFooter } from '@strapi/design-system/ModalLayout';
import { Box } from "@strapi/design-system/Box";
import { Stack } from "@strapi/design-system/Stack";
import { Breadcrumbs, Crumb } from '@strapi/design-system/Breadcrumbs';
import { Typography } from "@strapi/design-system/Typography";
import { Divider } from "@strapi/design-system/Divider";
import { Grid, GridItem } from "@strapi/design-system/Grid";
import { TextInput } from "@strapi/design-system/TextInput";
import { Option, Select } from "@strapi/design-system/Select";
import { ToggleCheckbox } from '@strapi/design-system/ToggleCheckbox';
import { Button } from "@strapi/design-system/Button";
import { Textarea } from '@strapi/design-system/Textarea';


const Create = ({ data, onCreate, onClose }) => {
  const { formatMessage } = useIntl();

  const nameLabel = formatMessage({
    id: getTrad('modal.input.label.name'),
    defaultMessage: 'Name',
  });
  const parentLabel = formatMessage({
    id: getTrad('modal.input.label.parent'),
    defaultMessage: 'Parent',
  });
  const slugLabel = formatMessage({
    id: getTrad('modal.input.label.slug'),
    defaultMessage: 'Slug',
  });
  const publishedLabel = formatMessage({
    id: getTrad('modal.input.label.published'),
    defaultMessage: 'Published',
  });
  const shortDescriptionLabel = formatMessage({
    id: getTrad('modal.input.label.shortDescription'),
    defaultMessage: 'Short Description',
  });
  const descriptionLabel = formatMessage({
    id: getTrad('modal.input.label.description'),
    defaultMessage: 'Description',
  });
  const metaTitleLabel = formatMessage({
    id: getTrad('modal.input.label.metaTitle'),
    defaultMessage: 'Meta Title',
  });
  const metaKeywordsLabel = formatMessage({
    id: getTrad('modal.input.label.metaKeywords'),
    defaultMessage: 'Meta Keywords',
  });
  const metaDescriptionLabel = formatMessage({
    id: getTrad('modal.input.label.metaDescription'),
    defaultMessage: 'Meta Description',
  });
  const imageLabel = formatMessage({
    id: getTrad('modal.input.label.image'),
    defaultMessage: 'Image',
  });
  const cancelTitle = formatMessage({
    id: getTrad('modal.input.button.cancel'),
    defaultMessage: 'Cancel',
  });
  const finishTitle = formatMessage({
    id: getTrad('modal.input.button.finish'),
    defaultMessage: 'Finish',
  });

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

  const submitButtonHandler = () => {
    let { success, validateErrors } = validateCategories(
      { name, shortDescription, description, metaTitle, metaKeywords, metaDescription },
      errors, setErrors);

    if (success) {
      onClose();
      onCreate({
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
          <Breadcrumbs label="Category model, name field">
            <Crumb>
              {
                formatMessage({
                  id: getTrad('category.title'),
                  defaultMessage: 'Categories',
                })
              }
            </Crumb>
          </Breadcrumbs>
        </Stack>
      </ModalHeader>
      <ModalBody>
        <Box paddingTop={4} paddingBottom={3}>
          <Typography variant={'beta'}>
            {
              formatMessage({
                id: getTrad('modal.input.title'),
                defaultMessage: 'Base Data',
              })
            }
          </Typography>
        </Box>
        <Divider/>
        <Box paddingTop={5}>
          <Grid gap={5}>
            <GridItem col={6}>
              <TextInput
                label={ nameLabel }
                name="name"
                value={ name }
                onChange={ e => setName(e.target.value) }
                error={ errors.name }
              />
            </GridItem>
            <GridItem col={6}>
              <TextInput
                label={ slugLabel }
                name="slug"
                value={ slug }
                onChange={ e => setSlug(e.target.value) }
              />
            </GridItem>
            <GridItem col={12}>
              <InputImage
                label={ imageLabel }
                selectedAsset={ image }
                deleteSelectedAsset={ () => setImage(null) }
                onFinish={ (image) => setImage(...image) }
              />
            </GridItem>
            <GridItem col={12}>
              <Textarea
                error={ errors.shortDescription }
                label={ shortDescriptionLabel }
                name="shortDescription"
                onChange={e => setShortDescription(e.target.value)}
              >
                { shortDescription }
              </Textarea>
            </GridItem>
            <GridItem col={6}>
              <Select
                label={ parentLabel }
                placeholder={ parentLabel }
                name='parent'
                value={ selectParent }
                onChange={ setSelectParent }
                onClear={ () => setSelectParent(null) }
              >
                { data.map((entry) => {
                  return <Option value={ entry.id } key={entry.id}>{ entry.name }</Option>
                })}
              </Select>
            </GridItem>
            <GridItem col={6}>
              <Stack size={1}>
                <Typography fontWeight={'bold'} variant={'pi'}>{ publishedLabel }</Typography>
                <ToggleCheckbox
                  onLabel={'On'}
                  offLabel={'Off'}
                  checked={ published }
                  onChange={() => { setPublished(!published) }}
                >
                  { publishedLabel }
                </ToggleCheckbox>
              </Stack>
            </GridItem>
            <GridItem col={12}>
              <Wysiwyg
                disabled={ false }
                label={ descriptionLabel }
                value={ description }
                name="rich-text"
                onChange={ e => setDescription(e.target.value) }
                error={ errors.description }
              />
            </GridItem>
          </Grid>
        </Box>
        <Box paddingTop={9} paddingBottom={3}><Typography variant={'beta'}>SEO</Typography></Box>
        <Divider/>
        <Box paddingTop={5}>
          <Grid gap={5}>
            <GridItem col={6}>
              <TextInput
                label={ metaTitleLabel }
                name="metaTitle"
                value={ metaTitle }
                onChange={ e => setMetaTitle(e.target.value) }
                error={ errors.metaTitle }
              />
            </GridItem>
            <GridItem col={6}>
              <TextInput
                label={ metaKeywordsLabel }
                name="metaKeywords"
                value={ metaKeywords }
                onChange={ e => setMetaKeywords(e.target.value) }
                error={ errors.metaKeywords }
              />
            </GridItem>
            <GridItem col={12}>
              <Textarea
                error={ errors.metaDescription }
                label={ metaDescriptionLabel }
                name="metaDescription"
                onChange={e => setMetaDescription(e.target.value)}>
                { metaDescription }
              </Textarea>
            </GridItem>
          </Grid>
        </Box>
      </ModalBody>
      <ModalFooter
        startActions = { <Button onClick = { () => onClose() } variant="tertiary">{ cancelTitle }</Button> }
        endActions = { <Button onClick = { submitButtonHandler }>{ finishTitle }</Button> }
      />
    </ModalLayout>
  );
}

export default Create;
