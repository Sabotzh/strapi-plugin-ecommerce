import React, {useEffect, useState} from "react";

import CollectionType from '@strapi/icons/CollectionType';

import { ModalLayout, ModalBody, ModalHeader, ModalFooter } from '@strapi/design-system/ModalLayout';
import { Box } from "@strapi/design-system/Box"
import { Stack } from "@strapi/design-system/Stack"
import { Breadcrumbs, Crumb } from '@strapi/design-system/Breadcrumbs';
import { Typography } from "@strapi/design-system/Typography";
import { Divider } from "@strapi/design-system/Divider";
import { Grid, GridItem } from "@strapi/design-system/Grid";
import { TextInput } from "@strapi/design-system/TextInput";
import { Option, Select } from "@strapi/design-system/Select";
import { ToggleCheckbox } from '@strapi/design-system/ToggleCheckbox';
import { Button } from "@strapi/design-system/Button";
import { Textarea } from '@strapi/design-system/Textarea';
import validateCategories from "../../../utils/validate";


const Create = ({ tableData, createCategory, closeHandler }) => {
  const [ name, setName ] = useState('')
  const [ selectParent, setSelectParent ] = useState(null)
  const [ type, setType ] = useState('')
  const [ slug, setSlug ] = useState('')
  const [ published, setPublished ] = useState(false)
  const [ description, setDescription ] = useState('')
  const [ metaTitle, setMetaTitle ] = useState('')
  const [ metaKeywords, setMetaKeywords ] = useState('')
  const [ metaDescription, setMetaDescription ] = useState('')

  const [ errors, setErrors] = useState({})


  // const categories = [
  //   'Fish & Meat', 'Fruits & Vegetable', 'Fresh Seafood', 'Cooking Essentials', 'Breakfast', 'Drinks',
  //   'Milk & Dairy', 'Organic Food', 'Honey', 'Sauces & Pickles', 'Jam & Jelly', 'Snacks & Instant',
  //   'Biscuits & Cakes', 'Household Tools', 'Baby Care', 'Pet Care', 'Beauty & Health', 'Sports & Fitness'
  // ]

  return (
    <ModalLayout onClose={ () => closeHandler() } labelledBy="Create">
      <ModalHeader>
        <Stack horizontal size={2}>
          <CollectionType/>
          <Breadcrumbs label="Category model, name field">
            <Crumb>Products</Crumb>
          </Breadcrumbs>
        </Stack>
      </ModalHeader>
      <ModalBody>
        <Box paddingTop={4} paddingBottom={3}><Typography variant={'beta'}>Create New Field</Typography></Box>
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
              <Select
                label='Parent'
                placeholder='Parent'
                name='parent'
                value={ selectParent }
                onChange={ setSelectParent }
                onClear={ () => setSelectParent(null) }
              >
                { tableData.map((entry) => {
                  return <Option value={ entry.id } key={entry.id}>{ entry.name }</Option>
                })}
              </Select>
            </GridItem>
            <GridItem col={6}>
              <TextInput
                placeholder="Type"
                label="Type"
                name="slug"
                value={ type }
                onChange={ e => setType(e.target.value) }
              />
            </GridItem>
            <GridItem col={12}>
              <Textarea error={ errors.description } label="Description" name="description" onChange={e => setDescription(e.target.value)}>
                { description }
              </Textarea>
            </GridItem>
            <GridItem col={12}>
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
        <Grid gap={5}>
          <GridItem col={6}>
            <TextInput
              label="Meta_title"
              name="metaTitle"
              value={ metaTitle }
              onChange={ e => setMetaTitle(e.target.value) }
              error={ errors.metaDescription }
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
            <Textarea error={ errors.metaKeywords } label="Meta_description" name="metaDescription" onChange={e => setMetaDescription(e.target.value)}>
              { metaDescription }
            </Textarea>
          </GridItem>
        </Grid>
      </ModalBody>
      <ModalFooter
        startActions = { <Button onClick = { () => closeHandler() } variant="tertiary"> Cancel </Button> }
        endActions = {
          <Button onClick = { () => {
            const { success, validateErrors } = validateCategories({ name, description, metaTitle, metaKeywords, metaDescription }, errors, setErrors)
            if (success) {
              closeHandler()
              createCategory({
                name,
                parent_category: selectParent,
                type,
                slug,
                description,
                meta_title: metaTitle,
                meta_description: metaDescription,
                meta_keywords: metaKeywords,
                publishedAt: published ? Date.now() : null,
              })
            } else {
              setErrors(validateErrors)
            }
            }}> Finish
          </Button>
          }
      />
    </ModalLayout>
  )
}

export default Create