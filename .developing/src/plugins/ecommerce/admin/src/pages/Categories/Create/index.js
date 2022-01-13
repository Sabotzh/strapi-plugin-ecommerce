import React, {useState} from "react";

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
import {Button} from "@strapi/design-system/Button";


const Create = ({ tableData, createField, closeHandler }) => {
  const [ name, setName ] = useState('')
  const [ parent, setParent ] = useState('')
  const [ type, setType ] = useState('')
  const [ slug, setSlug ] = useState('')
  const [ published, setPublished ] = useState(false)
  const categories = [
    'Fish & Meat', 'Fruits & Vegetable', 'Fresh Seafood', 'Cooking Essentials', 'Breakfast', 'Drinks',
    'Milk & Dairy', 'Organic Food', 'Honey', 'Sauces & Pickles', 'Jam & Jelly', 'Snacks & Instant',
    'Biscuits & Cakes', 'Household Tools', 'Baby Care', 'Pet Care', 'Beauty & Health', 'Sports & Fitness'
  ]

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
                value={ name }
                onChange={ e => setName(e.target.value) }
              />
            </GridItem>
            <GridItem col={6}>
              <Select
                label={'Parent'}
                placeholder={'Parent'}
                value={ parent }
                onChange={ setParent }
              >
                { categories.map((entry, id) => <Option value={entry} key={id}>{ entry }</Option>) }
              </Select>
            </GridItem>
            <GridItem col={6}>
              <TextInput
                placeholder="Type"
                label="Type"
                value={ type }
                onChange={ e => setType(e.target.value) }
              />
            </GridItem>
            <GridItem col={6}>
              <TextInput
                placeholder="Slug"
                label="Slug"
                value={ slug }
                onChange={ e => setSlug(e.target.value) }
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
      </ModalBody>
      <ModalFooter
        startActions = { <Button onClick = { () => closeHandler() } variant="tertiary"> Cancel </Button> }
        endActions = { <Button onClick = { () => {
          closeHandler()
          createField( [...tableData, { name, parent, type, slug, published, id: Math.floor(Math.random() * (10000 - 1000)) + 1000 }])
        }
        }> Finish </Button> }
      />
    </ModalLayout>
  )
}

export default Create