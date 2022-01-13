import React, {useState} from "react";

import CollectionType from '@strapi/icons/CollectionType';

import { ModalLayout, ModalBody, ModalHeader, ModalFooter } from '@strapi/design-system/ModalLayout';
import { Box } from "@strapi/design-system/Box"
import { Stack } from "@strapi/design-system/Stack"
import { Breadcrumbs, Crumb } from '@strapi/design-system/Breadcrumbs';
import { Typography } from "@strapi/design-system/Typography";
import { Divider } from '@strapi/design-system/Divider';
import { TextInput } from '@strapi/design-system/TextInput';
import { Grid, GridItem } from '@strapi/design-system/Grid';
import { Option, Select } from "@strapi/design-system/Select";
import { NumberInput } from '@strapi/design-system/NumberInput';
import { Button } from '@strapi/design-system/Button'

const Edit = ({ tableData, closeHandler, createField } ) => {
  const [ title, setTitle ] = useState()
  const [ sku, setSku ] = useState()
  const [ icon, setIcon ] = useState()
  const [ category, setCategory ] = useState()
  const [ price, setPrice ] = useState()
  const [ stock, setStock ] = useState()
  const [ status, setStatus ] = useState()
  const [ discount, setDiscount ] = useState()

  const categories = [
    'Fish & Meat', 'Fruits & Vegetable', 'Fresh Seafood', 'Cooking Essentials', 'Breakfast', 'Drinks',
    'Milk & Dairy', 'Organic Food', 'Honey', 'Sauces & Pickles', 'Jam & Jelly', 'Snacks & Instant',
    'Biscuits & Cakes', 'Household Tools', 'Baby Care', 'Pet Care', 'Beauty & Health', 'Sports & Fitness'
  ]

  return (
    <ModalLayout onClose={ () => closeHandler() } labelledBy="Edit">
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
                placeholder="Product Name"
                label="Product Name"
                value={title}
                onChange={ e => setTitle(e.target.value) }
              />
            </GridItem>
            <GridItem col={6}>
              <TextInput
                placeholder="SKU"
                label="SKU"
                value={sku}
                onChange={ e => setSku(e.target.value) }
              />
            </GridItem>
            <GridItem col={6}>
              <TextInput
                placeholder="Icon"
                label="Icon"
                value={icon}
                onChange={ e => setIcon(e.target.value) }
              />
            </GridItem>
            <GridItem col={6}>
              <Select
                label={'Category'}
                placeholder={'Category'}
                value={ category }
                onChange={ setCategory }
              >
                { categories.map((entry, id) => <Option value={entry} key={id}>{ entry }</Option>) }
              </Select>
            </GridItem>
            <GridItem col={6}>
              <NumberInput
                placeholder="Price"
                label="Price"
                value={price}
                onValueChange={value => setPrice(value)}
                required={true} />
            </GridItem>
            <GridItem col={6}>
              <NumberInput
                placeholder="Stock"
                label="Stock"
                value={stock}
                onValueChange={value => setStock(value)}
                required={true} />
            </GridItem>
            <GridItem col={6}>
              <TextInput
                placeholder="Status"
                label="Status"
                value={status}
                onChange={ e => setStatus(e.target.value) }
                required={true}
              />
            </GridItem>
            <GridItem col={6}>
              <TextInput
                placeholder="Discount"
                label="Discount"
                value={discount}
                onChange={ e => setDiscount(e.target.value) }
              />
            </GridItem>
          </Grid>
        </Box>
      </ModalBody>
      <ModalFooter
        startActions = { <Button onClick = { () => closeHandler() } variant="tertiary"> Cancel </Button> }
        endActions = { <Button onClick = { () => {
          closeHandler()
          createField([ ...tableData, { productName: title, sku, icon, category, price, stock, status, discount }])
        }
        }> Finish </Button> }
      />
    </ModalLayout>
  )
}

export default Edit