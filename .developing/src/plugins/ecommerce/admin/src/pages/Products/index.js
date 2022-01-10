import React from 'react';

import { useState, useCallback } from 'react'
import getTrad from '../../utils/getTrad';
import RowTable from "./RowTable";
import Create from "./Create";

import Plus from '@strapi/icons/Plus'

import { useIntl } from 'react-intl';
import { useFocusWhenNavigate } from '@strapi/helper-plugin';
import { HeaderLayout, ContentLayout } from '@strapi/design-system/Layout';
import { Table, Thead, Tbody, Tr, Th } from '@strapi/design-system/Table';
import { Typography } from '@strapi/design-system/Typography';
import { VisuallyHidden } from "@strapi/design-system/VisuallyHidden";
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
  const [ sortByPrice, setSortByPrice ] = useState()
  const [ tableData, setTableData ] = useState([
      {
        sku: '1e2c47',
        icon: '',
        productName: 'Green Leaf Lettuce',
        category: 'Fruits & Vegetable',
        price: 14,
        stock: 70,
        status: 'selling',
        discount: '',
        published: true
      },
      {
        sku: '1e2c48',
        icon: '',
        productName: 'Green Leaf Lettuce',
        category: 'Fish & Meat',
        price: 15,
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
        price: 16,
        stock: 70,
        status: 'selling',
        discount: '',
        published: true
      }
    ]
  )

  const categories = [
    'Fish & Meat', 'Fruits & Vegetable', 'Fresh Seafood', 'Cooking Essentials', 'Breakfast', 'Drinks',
    'Milk & Dairy', 'Organic Food', 'Honey', 'Sauces & Pickles', 'Jam & Jelly', 'Snacks & Instant',
    'Biscuits & Cakes', 'Household Tools', 'Baby Care', 'Pet Care', 'Beauty & Health', 'Sports & Fitness'
  ]
  const prices = ['Low to High', 'High to Low']

  const sort = () => {
    // setTableData(tableData.sort((a, b) => {
    //     if ((a.category === sortData.category && b.category === sortData.category) ||
    //       (a.category !== sortData.category && b.category === sortData.category)) {
    //       if (sortData.price) {
    //         if (sortData.price === 'Low to High') return a.price - b.price
    //         return b.price - a.price
    //       }
    //       return 0
    //     }
    //     if (a.category !== sortByCategoriesValue && b.category === sortByCategoriesValue) return 1
    //     if (a.category === sortByCategoriesValue && b.category !== sortByCategoriesValue) return -1
    //     return 0
    //   })
    // )
  }


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
          tableData = { tableData }
          createField = { setTableData }
        />
      }
      <ContentLayout>
        <Stack size={7}>
          <Stack horizontal size={3}>
            <Select
              placeholder={'Sort by category'}
              value={ sortByCategoriesValue }
              onChange={ (value) => {
                setSortByCategoriesValue(value)
                sort()
              }}
              onClear={ () => {
                setSortByCategoriesValue(null)
                sort()
              } }
            >
              { categories.map((entry, id) => <Option value={entry} key={id}>{ entry }</Option>) }
            </Select>
            <Select
              placeholder={'Sort by price'}
              value={ sortByPrice }
              onChange={ (value) => {
                setSortByPrice(value)
                sort()
              } }
              onClear={ () => {
                setSortByPrice(null)
                sort()
              }}
            >
              { prices.map((entry, id) => <Option value={entry} key={id}>{ entry }</Option>) }
            </Select>
          </Stack>
          <Table colCount={9} rowCount={15}>
            <Thead>
              <Tr>
                <Th><Typography variant="sigma">SKU</Typography></Th>
                <Th><Typography variant="sigma">Icon</Typography></Th>
                <Th><Typography variant="sigma">Product name</Typography></Th>
                <Th><Typography variant="sigma">Category</Typography></Th>
                <Th><Typography variant="sigma">Price</Typography></Th>
                <Th><Typography variant="sigma">Stock</Typography></Th>
                <Th><Typography variant="sigma">Status</Typography></Th>
                <Th><Typography variant="sigma">Discount</Typography></Th>
                <Th><Typography variant="sigma">Published</Typography></Th>
                <Th><VisuallyHidden>Actions</VisuallyHidden></Th>
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
