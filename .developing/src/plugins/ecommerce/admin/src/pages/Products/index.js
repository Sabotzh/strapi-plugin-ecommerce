import React from 'react';

import { useState } from 'react'
import getTrad from '../../utils/getTrad';
import RowTable from "./RowTable";
import Create from "./Create";

import Plus from '@strapi/icons/Plus'

import { useIntl } from 'react-intl';
import { useFocusWhenNavigate } from '@strapi/helper-plugin';
import { HeaderLayout, ContentLayout } from '@strapi/design-system/Layout';
import { Table, Thead, Tbody, TFooter, Tr, Td, Th } from '@strapi/design-system/Table';
import { Typography } from '@strapi/design-system/Typography';
import { VisuallyHidden } from "@strapi/design-system/VisuallyHidden";
import { Box } from '@strapi/design-system/Box'
import { Select, Option } from '@strapi/design-system/Select';
import { Stack } from '@strapi/design-system/Stack';
import { Button } from '@strapi/design-system/Button';


const ProductsPage = () => {
  useFocusWhenNavigate();

  const { formatMessage } = useIntl();
  const title = formatMessage({
    id: getTrad('products.title'),
    defaultMessage: 'Products',
  });

  const [ isVisible, setIsVisible ] = useState(false)

  const [ sortByCategoriesValue, setSortByCategoriesValue ] = useState()
  const categories = [
    'Fish & Meat', 'Fruits & Vegetable', 'Fresh Seafood', 'Cooking Essentials', 'Breakfast', 'Drinks',
    'Milk & Dairy', 'Organic Food', 'Honey', 'Sauces & Pickles', 'Jam & Jelly', 'Snacks & Instant',
    'Biscuits & Cakes', 'Household Tools', 'Baby Care', 'Pet Care', 'Beauty & Health', 'Sports & Fitness'
  ]
  const [ sortByPrice, setSortByPrice ] = useState()
  const prices = ['Low to High', 'High to Low']

  const [ tableData, setTableData ] = useState(
    [
      {
        sku: '1e2c47',
        icon: '',
        productName: 'Green Leaf Lettuce',
        category: 'Fruits & Vegetable',
        price: '$ 14',
        stock: 70,
        status: 'selling',
        discount: '',
        published: true
      },
      {
        sku: '1e2c48',
        icon: '',
        productName: 'Green Leaf Lettuce',
        category: 'Fruits & Vegetable',
        price: '$ 14',
        stock: 70,
        status: 'selling',
        discount: '',
        published: false
      },
      {
        sku: '1e2c49',
        icon: '',
        productName: 'Green Leaf Lettuce',
        category: 'Fruits & Vegetable',
        price: '$ 14',
        stock: 70,
        status: 'selling',
        discount: '',
        published: true
      }
    ]
  )

  const tableDataUpdate = (updatedRow, idUpdatedRow) => {
    const updatedTableData = tableData.map(row => {
      if (row.sku === idUpdatedRow) {
        return updatedRow
      }
      return row
    })
    setTableData(updatedTableData)
  }

  const deleteRow = (idRow) => {
    setTableData(tableData.filter((row) => row.sku !== idRow))
  }


  return (
    <main>
      <HeaderLayout
        primaryAction={
          <Button
            startIcon={ <Plus/> }
            onClick={ () => setIsVisible(true) }
          >
            Add product
          </Button>
        }
        title={title}
        subtitle={formatMessage({
          id: getTrad('products.description'),
          defaultMessage: 'Configure the ecommerce plugin',
        })}
      />
      { isVisible &&
        <Create
          closeHandler = { () => setIsVisible(false) }
        />
      }
      <ContentLayout>
        <Stack size={7}>
          <Stack horizontal size={3}>
            <Select
              placeholder={'Sort by category'}
              value={ sortByCategoriesValue }
              onChange={ setSortByCategoriesValue }
              onClear={ () => setSortByCategoriesValue(null) }
            >
              { categories.map((entry, id) => <Option value={entry} key={id}>{ entry }</Option>) }
            </Select>
            <Select
              placeholder={'Sort by price'}
              value={ sortByPrice }
              onChange={ setSortByPrice }
              onClear={ () => setSortByPrice(null) }
            >
              { prices.map((entry, id) => <Option value={entry} key={id}>{ entry }</Option>) }
            </Select>
          </Stack>
          <Table colCount={9} rowCount={15}>
            <Thead>
              <Tr>
                <Th>
                  <Typography variant="sigma">SKU</Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">Icon</Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">Product name</Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">Category</Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">Price</Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">Stock</Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">Status</Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">Discount</Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">Published</Typography>
                </Th>
                <Th>
                  <VisuallyHidden>Actions</VisuallyHidden>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                tableData.map(entry =>
                  <Tr key={entry.sku}>
                    <RowTable
                      rowData = { entry }
                      updateRowData = { (dataRow, idRow) => tableDataUpdate(dataRow, idRow) }
                      deleteRow = { (idRow) => deleteRow(idRow) }
                    />
                  </Tr>
                )
              }
            </Tbody>
          </Table>
        </Stack>
      </ContentLayout>
    </main>
  );
};

export default ProductsPage;