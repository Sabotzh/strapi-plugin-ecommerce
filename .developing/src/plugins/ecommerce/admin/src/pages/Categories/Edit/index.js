import React, { useState } from 'react';

import validateCategories from '../../../utils/validate';
import InputSlug from '../../../components/InputSlug';
import Wysiwyg from '../../../components/Wysiwyg/Wysiwyg';
import InputImage from '../../../components/InputImage';
import PopupLoader from '../../../components/PopupLoader';

import CollectionType from '@strapi/icons/CollectionType';
import { ModalLayout, ModalBody, ModalHeader, ModalFooter } from '@strapi/design-system/ModalLayout';
import { Box } from '@strapi/design-system/Box';
import { useNotification } from '@strapi/helper-plugin';
import { Stack } from '@strapi/design-system/Stack';
import { Breadcrumbs, Crumb } from '@strapi/design-system/Breadcrumbs';
import { Typography } from "@strapi/design-system/Typography";
import { Divider } from '@strapi/design-system/Divider';
import { TextInput } from '@strapi/design-system/TextInput';
import { Grid, GridItem } from '@strapi/design-system/Grid';
import { Option, Select } from "@strapi/design-system/Select";
import { Button } from '@strapi/design-system/Button';
import { Textarea } from '@strapi/design-system/Textarea';
import { ToggleCheckbox } from '@strapi/design-system/ToggleCheckbox';
import ImportSlug from "../../../components/InputSlug";


const Edit = ({ rowData, closeHandler, updateRowData, tableData }) => {
  const [ name, setName ] = useState(rowData.name);
  const [ selectParent, setSelectParent ] = useState(rowData.parentCategory?.id);
  const [ published, setPublished ] = useState(!!rowData.publishedAt);
  const [ slug, setSlug ] = useState(rowData.slug);
  const [ shortDescription, setShortDescription ] = useState(rowData.shortDescription);
  const [ description, setDescription ] = useState(rowData.description);
  const [ metaTitle, setMetaTitle ] = useState(rowData.metaTitle);
  const [ metaKeywords, setMetaKeywords ] = useState(rowData.metaKeywords);
  const [ metaDescription, setMetaDescription ] = useState(rowData.metaDescription);
  const [ image, setImage ] = useState(rowData.image);

  const [ errors, setErrors ] = useState({});
  const [ loader, setLoader ] = useState(false)

  const notification = useNotification()

  const submitButtonHandler = async() => {
    const {success, validateErrors} = validateCategories({
      name,
      shortDescription,
      description,
      metaTitle,
      metaKeywords,
      metaDescription
    }, errors, setErrors)

    if (success) {
      setLoader(true)
      await updateRowData(rowData.id, {
        name,
        image,
        parentCategory: selectParent,
        slug,
        shortDescription,
        description,
        metaTitle,
        metaDescription,
        metaKeywords,
        publishedAt: published,
      })
        .then((res) => {
          setLoader(false)
          if (res) closeHandler()
        })
    } else {
      notification({ type: 'warning', message: 'Fill in all required fields' })
      setErrors(validateErrors)
    }
  }

  return (
    <ModalLayout onClose={closeHandler} labelledBy="Edit">
      <ModalHeader>
        <Stack horizontal size={2}>
          <CollectionType/>
          <Breadcrumbs label="Category model, name field">
            <Crumb>Categories</Crumb>
            <Crumb>{rowData.name}</Crumb>
          </Breadcrumbs>
        </Stack>
      </ModalHeader>
      <PopupLoader loader={loader}>
        <ModalBody>
          <Box paddingTop={4} paddingBottom={3}><Typography variant={'beta'}>Edit {rowData.name}</Typography></Box>
          <Divider/>
          <Box paddingTop={5}>
            <Grid gap={5}>
              <GridItem col={6}>
                <TextInput
                  placeholder='Name'
                  label='Name'
                  name='Name'
                  value={name}
                  onChange={e => setName(e.target.value)}
                  error={errors.name}
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
                  id={ rowData.id }
                  url={ 'categories/create-slug' }
                />
              </GridItem>
              <GridItem col={12}>
                <InputImage
                  label='Image'
                  selectedAsset={image}
                  deleteSelectedAsset={() => setImage(null)}
                  onFinish={(image) => setImage(...image)}
                />
              </GridItem>
              <GridItem col={12}>
                <Textarea
                  error={errors.shortDescription}
                  label="Short description"
                  name="shortDescription"
                  onChange={e => setShortDescription(e.target.value)}
                >
                  {shortDescription}
                </Textarea>
              </GridItem>
              <GridItem col={6}>
                <Select
                  label='Parent'
                  placeholder='Parent'
                  name='Parent'
                  value={selectParent}
                  onChange={setSelectParent}
                  onClear={() => setSelectParent(null)}
                >
                  {tableData.map((entry) => {
                    return <Option value={entry.id} key={entry.id}>{entry.name}</Option>
                  })}
                </Select>
              </GridItem>
              <GridItem col={6}>
                <Stack size={1}>
                  <Typography fontWeight={'bold'} variant={'pi'}>{'Published'}</Typography>
                  <ToggleCheckbox
                    onLabel={'On'}
                    offLabel={'Off'}
                    checked={published}
                    onChange={() => {
                      setPublished(!published)
                    }}
                  >
                    {'Published'}
                  </ToggleCheckbox>
                </Stack>
              </GridItem>
              <GridItem col={12}>
                <Wysiwyg
                  disabled={false}
                  label={'Description'}
                  value={description}
                  name="rich-text"
                  onChange={e => setDescription(e.target.value)}
                  error={errors.description}
                />
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
                    value={metaTitle}
                    onChange={e => setMetaTitle(e.target.value)}
                    error={errors.metaTitle}
                  />
                </GridItem>
                <GridItem col={6}>
                  <TextInput
                    label="Meta_keywords"
                    name="metaKeywords"
                    value={metaKeywords}
                    onChange={e => setMetaKeywords(e.target.value)}
                    error={errors.metaKeywords}
                  />
                </GridItem>
                <GridItem col={12}>
                  <Textarea
                    error={errors.metaDescription}
                    label="Meta_description"
                    name="metaDescription"
                    onChange={e => setMetaDescription(e.target.value)}
                  >
                    { metaDescription }
                  </Textarea>
                </GridItem>
              </Grid>
            </Box>
          </Box>
        </ModalBody>
        <ModalFooter
          startActions={<Button onClick={ closeHandler } variant="tertiary"> Cancel </Button>}
          endActions={<Button onClick={ submitButtonHandler }> Finish </Button>}
        />
      </PopupLoader>
    </ModalLayout>
  );
}

export default Edit;
