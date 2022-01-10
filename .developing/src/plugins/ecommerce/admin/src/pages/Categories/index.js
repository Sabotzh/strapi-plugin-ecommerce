import React, {useState} from 'react';
import Plus from "@strapi/icons/Plus";

import getTrad from '../../utils/getTrad';
import Create from "./Create";
import RowTable from "./RowTable";

import { useIntl } from 'react-intl';
import { useFocusWhenNavigate } from '@strapi/helper-plugin';
import { ContentLayout, HeaderLayout } from '@strapi/design-system/Layout';
import { Stack } from "@strapi/design-system/Stack";
import { Option, Select } from "@strapi/design-system/Select";
import { Table, Tbody, Th, Thead, Tr } from "@strapi/design-system/Table";
import { Typography } from "@strapi/design-system/Typography";
import { VisuallyHidden } from "@strapi/design-system/VisuallyHidden";
import { Button } from "@strapi/design-system/Button";


const CategoriesPage = () => {
  useFocusWhenNavigate();

  const { formatMessage } = useIntl();
  const title = formatMessage({
    id: getTrad('categories.title'),
    defaultMessage: 'Categories',
  });

  const [ isVisible, setIsVisible ] = useState(false)
  const [ sortBy, setSortBy ] = useState()
  const categories = [
    'Fish & Meat', 'Fruits & Vegetable', 'Fresh Seafood', 'Cooking Essentials', 'Breakfast', 'Drinks',
    'Milk & Dairy', 'Organic Food', 'Honey', 'Sauces & Pickles', 'Jam & Jelly', 'Snacks & Instant',
    'Biscuits & Cakes', 'Household Tools', 'Baby Care', 'Pet Care', 'Beauty & Health', 'Sports & Fitness'
  ]
  const [ tableData, setTableData] = useState([
    {
      id: 5403,
      name: 'My Name?',
      parent: 'Organic Food',
      type: 'Grocery',
      slug: 'slug-slug',
      published: true
    },
    {
      id: 5404,
      name: 'My Name?',
      parent: 'Fish & Meat',
      type: 'Grocery',
      slug: 'slug-slug',
      published: false
    },
    {
      id: 5405,
      name: 'My Name?',
      parent: 'Fresh Seafood',
      type: 'Grocery',
      slug: 'slug-slug',
      published: true
    }
  ])

  const tableDataUpdate = (updatedRow, idUpdatedRow) => {
    const updatedTableData = tableData.map(row => {
      if (row.id === idUpdatedRow) {
        return updatedRow
      }
      return row
    })
    setTableData(updatedTableData)
  }

  const deleteRow = (idRow) => {
    setTableData(tableData.filter((row) => row.id !== idRow))
  }

  const sort = (sortCategory) => {
    setSortBy(sortCategory)
    setTableData(tableData.sort((a, b) => {
      console.log(a.parent, sortCategory)
      if (a.parent === sortCategory && b.parent === sortCategory) return 0
      if (a.parent === sortCategory && b.parent !== sortCategory) return -1
      return 1
    }))
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
          id: getTrad('categories.description'),
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
              value={ sortBy }
              onChange={ (value) => {
                setSortBy(value)
                sort(value)
              } }
              onClear={ () => {
                setSortBy(null)
                sort(null)
              } }
            >
              { categories.map((entry, id) => <Option value={entry} key={id}>{ entry }</Option>) }
            </Select>
          </Stack>
          <Table colCount={6} rowCount={15}>
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
                tableData.map(entry =>
                  <Tr key={entry.id}>
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

export default CategoriesPage;
