import React from 'react';

import { useState, useEffect } from 'react'
import getTrad from '../../utils/getTrad';
import RowTable from "./RowTable";
import Create from "./Create";

import Plus from '@strapi/icons/Plus'

import { useIntl } from 'react-intl';
import { useFocusWhenNavigate, request  } from '@strapi/helper-plugin';
import { HeaderLayout, ContentLayout } from '@strapi/design-system/Layout';
import { Table, Thead, Tbody, Tr, Th } from '@strapi/design-system/Table';
import { Typography } from '@strapi/design-system/Typography';
import { VisuallyHidden } from "@strapi/design-system/VisuallyHidden";
import { Select, Option } from '@strapi/design-system/Select';
import { Stack } from '@strapi/design-system/Stack';
import { Button } from '@strapi/design-system/Button';
import { Grid, GridItem } from '@strapi/design-system/Grid';



const ProductsPage = () => {
  useFocusWhenNavigate();

  const { formatMessage } = useIntl();
  const title = formatMessage({
    id: getTrad('products.title'),
    defaultMessage: 'Products',
  });

  const [ tableData, setTableData ] = useState([])
  const [ categories, setCategories ] = useState([])
  const [ isVisible, setIsVisible ] = useState(false)
  const [ sortByCategoriesValue, setSortByCategoriesValue ] = useState('')
  const [ sortByPrice, setSortByPrice ] = useState('')


  const getTableData = async () => {
    await request(`/ecommerce/products`)
      .then((res) => sort(res))
  }

  const getCategories = async () => {
    await request(`/ecommerce/categories`)
      .then((res) => {
        setCategories(res)
      })
  }

  useEffect(async () => {
    await getTableData()
    await getCategories()
  }, [])

  const sort = (sortData = tableData) => {
    const copyTableData = JSON.parse(JSON.stringify(sortData))

    if (!sortByCategoriesValue && !sortByPrice) {
      setTableData(sortData.sort((a, b) => {
        return Date.parse(a.createdAt) - Date.parse(b.createdAt)
      }))
    } else {
      setTableData(
        copyTableData.sort((a, b) => {
          if ((a.category === sortByCategoriesValue && b.category === sortByCategoriesValue) ||
            (a.category !== sortByCategoriesValue && b.category !== sortByCategoriesValue)) {
            if (sortByPrice) {
              if (sortByPrice === 'Low to High') return a.price - b.price
              return b.price - a.price
            }
            return 0
          }
          if (a.category !== sortByCategoriesValue && b.category === sortByCategoriesValue) return 1
          if (a.category === sortByCategoriesValue && b.category !== sortByCategoriesValue) return -1
          return 0
        })
      )
    }
  }

  useEffect(() => sort(), [sortByPrice, sortByCategoriesValue])

  const updateTableData = async (id, updateData) => {
    await request(`/ecommerce/products/${id}`, {
      method: 'PUT',
      body: updateData
    }).then(() => getTableData())
  }

  const deleteRow = async(id) => {
    await request(`/ecommerce/products/${id}`, {
      method: 'DELETE',
    }).then(() => getTableData())
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
          <Grid gap={3}>
            <GridItem col={3}>
              <Select
                placeholder={'Sort by category'}
                value={ sortByCategoriesValue }
                onChange={ (value) => {
                  setSortByCategoriesValue(value)
                }}
                onClear={ () => {
                  setSortByCategoriesValue(null)
                } }
              >
                { categories.map((entry, id) => <Option value={entry.id} key={entry.id}>{ entry.name }</Option>) }
              </Select>
            </GridItem>
            <GridItem col={2}>
              <Select
                placeholder={'Sort by price'}
                value={ sortByPrice }
                onChange={ (value) => {
                  setSortByPrice(value)
                }}
                onClear={ () => {
                  setSortByPrice(null)
                }}
              >
                <Option value={'Low to High'}>{ 'Low to High' }</Option>
                <Option value={'High to Low'}>{ 'High to Low' }</Option>
              </Select>
            </GridItem>
          </Grid>

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
                  <Tr key={entry.id}>
                    <RowTable
                      rowData = { entry }
                      updateRowData = { (id, data) => updateTableData(id, data) }
                      deleteRow = { (idRow) => deleteRow(idRow) }
                      allCategories = { categories }
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
