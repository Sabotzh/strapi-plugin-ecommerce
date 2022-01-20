import React, { useState, useEffect } from 'react';

import Plus from "@strapi/icons/Plus";

import getTrad from '../../utils/getTrad';
import Create from "./Create";
import RowTable from "./RowTable";

import { useIntl } from 'react-intl';
import { useFocusWhenNavigate, request  } from '@strapi/helper-plugin';
import { ContentLayout, HeaderLayout } from '@strapi/design-system/Layout';
import { Stack } from "@strapi/design-system/Stack";
import { Option, Select } from "@strapi/design-system/Select";
import { Table, Tbody, Th, Thead, Tr } from "@strapi/design-system/Table";
import { Typography } from "@strapi/design-system/Typography";
import { VisuallyHidden } from "@strapi/design-system/VisuallyHidden";
import { Grid, GridItem } from '@strapi/design-system/Grid';
import { Button } from "@strapi/design-system/Button"


const CategoriesPage = () => {
  useFocusWhenNavigate();

  const { formatMessage } = useIntl();
  const title = formatMessage({
    id: getTrad('categories.title'),
    defaultMessage: 'Categories',
  });

  const [ isCreateVisible, setIsCreateVisible ] = useState(false)
  const [ sortBy, setSortBy ] = useState(null)
  const [ tableData, setTableData] = useState([])
  // const categories = [
  //   'Fish & Meat', 'Fruits & Vegetable', 'Fresh Seafood', 'Cooking Essentials', 'Breakfast', 'Drinks',
  //   'Milk & Dairy', 'Organic Food', 'Honey', 'Sauces & Pickles', 'Jam & Jelly', 'Snacks & Instant',
  //   'Biscuits & Cakes', 'Household Tools', 'Baby Care', 'Pet Care', 'Beauty & Health', 'Sports & Fitness'
  // ]

  const getTableData = async () => {
    await request(`/ecommerce/categories`)
      .then((res) => sort(sortBy, res))
  }

  const updateTableData = async (id, updateData) => {
    await request(`/ecommerce/categories/${id}`, {
      method: 'PUT',
      body: updateData
    }).then(() => getTableData())
  }

  const createCategory = async (data) => {
    console.log(data)
    await request(`/ecommerce/categories`, {
      method: 'POST',
      body: data
    }).then(() => getTableData())
  }

  useEffect(async () => {
    await getTableData()
  }, [])

  const deleteRow = async(id) => {
    await request(`/ecommerce/categories/${id}`, {
      method: 'DELETE',
    }).then(() => getTableData())
  }

  const sort = (sortCategory, sortData = tableData) => {
    setSortBy(sortCategory)
    if (!sortCategory) {
      setTableData(sortData.sort((a, b) => {
        return Date.parse(a.createdAt) - Date.parse(b.createdAt)
      }))
    } else {
      setTableData(sortData.sort((a, b) => {
        if (a.name === sortCategory && b.name === sortCategory) return 0
        if (a.name === sortCategory && b.name !== sortCategory) return -1
        return 1
      }))
    }
  }

  return (
    <main>
      <HeaderLayout
        primaryAction={
          <Button
            startIcon={ <Plus/> }
            onClick={ () => setIsCreateVisible(true) }
          >
            Add product
          </Button>
        }
        title={title}
        subtitle={formatMessage({
          id: getTrad('categories.description'),
          defaultMessage: 'Configure the ecommerce plugin',
        })}
      />
      { isCreateVisible &&
        <Create
          closeHandler = { () => setIsCreateVisible(false) }
          tableData = { tableData }
          createCategory = { createCategory }
        />
      }
      <ContentLayout>
        <Stack size={7}>
          <Stack size={3}>
            <Grid>
              <GridItem col={3}>
                <Select
                  placeholder={'Sort by category'}
                  value={ sortBy }
                  onChange={ (value) => {
                    setSortBy(value)
                    sort(value)
                  }}
                  onClear={ () => {
                    setSortBy(null)
                    sort(null)
                  }}
                  >
                  { tableData.map((entry, id) => <Option value={ entry.name } key={id}>{ entry.name }</Option>) }
                </Select>
              </GridItem>
            </Grid>
          </Stack>
          <Table rowCount={10} colCount={7}>
            <Thead>
              <Tr>
                <Th><Typography variant="sigma">ID</Typography></Th>
                <Th><Typography variant="sigma">Name</Typography></Th>
                <Th><Typography variant="sigma">Parent</Typography></Th>
                <Th><Typography variant="sigma">Type</Typography></Th>
                <Th><Typography variant="sigma">Slug</Typography></Th>
                <Th><Typography variant="sigma">Published</Typography></Th>
                <Th><VisuallyHidden>Actions</VisuallyHidden></Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                tableData.map(entry => {
                  return <Tr key={entry.id}>
                    <RowTable
                      tableData = { tableData }
                      rowData={ entry }
                      updateRowData={(id, data) => updateTableData(id, data)}
                      deleteRow={(idRow) => deleteRow(idRow)}
                    />
                  </Tr>
                })
              }
            </Tbody>
          </Table>
        </Stack>
      </ContentLayout>
    </main>
  );
};

export default CategoriesPage;
