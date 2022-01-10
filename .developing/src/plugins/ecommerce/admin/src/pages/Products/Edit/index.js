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

const Edit = ({ rowData, closeHandler, updateRowData } ) => {
  const [ title, setTitle ] = useState(rowData.productName)
  const [ sku, setSku ] = useState(rowData.sku)
  const [ icon, setIcon ] = useState(rowData.icon)
  const [ category, setCategory ] = useState(rowData.category)
  const [ price, setPrice ] = useState(rowData.price)
  const [ stock, setStock ] = useState(rowData.stock)
  const [ status, setStatus ] = useState(rowData.status)
  const [ discount, setDiscount ] = useState(rowData.discount)

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
            <Crumb>{ rowData.productName }</Crumb>
          </Breadcrumbs>
        </Stack>
      </ModalHeader>
      <ModalBody>
        <Box paddingTop={4} paddingBottom={3}><Typography variant={'beta'}>Edit {rowData.productName}</Typography></Box>
        <Divider/>
        <Box paddingTop={5}>
          <Grid gap={5}>
            <GridItem col={6}>
              <TextInput
                placeholder="Product Name"
                label="Product Name"
                error={ title.length < 1 ? 'Must be more than one character' : undefined }
                value={title}
                onChange={ e => setTitle(e.target.value) }
                required={true}
              />
            </GridItem>
            <GridItem col={6}>
              <TextInput
                placeholder="SKU"
                label="SKU"
                value={sku}
                onChange={ e => setSku(e.target.value) }
                required={true}
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
          updateRowData({ productName: title, sku, icon, category, price, stock, status, discount }, sku)
          }
        }> Finish </Button> }
      />
    </ModalLayout>
  )
}

export default Edit