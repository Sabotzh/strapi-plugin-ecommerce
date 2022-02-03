import React, { useState, useEffect } from 'react';

import Plus from '@strapi/icons/Plus';

import getTrad from '../../utils/getTrad';
import Create from './Create';
import RowTable from './RowTable';
import CustomAlert from '../../components/Alert'

import { useIntl } from 'react-intl';
import { useFocusWhenNavigate, request  } from '@strapi/helper-plugin';
import { ContentLayout, HeaderLayout } from '@strapi/design-system/Layout';
import { Stack } from '@strapi/design-system/Stack';
import { Option, Select } from '@strapi/design-system/Select';
import { Table, Tbody, Th, Thead, Tr } from '@strapi/design-system/Table';
import { Typography } from '@strapi/design-system/Typography';
import { VisuallyHidden } from '@strapi/design-system/VisuallyHidden';
import { Grid, GridItem } from '@strapi/design-system/Grid';
import { Button } from '@strapi/design-system/Button';
import { Flex } from '@strapi/design-system/Flex';
import axios from "axios";

const CategoriesPage = () => {
  useFocusWhenNavigate();

  const { formatMessage } = useIntl();
  const title = formatMessage({
    id: getTrad('categories.title'),
    defaultMessage: 'Categories',
  });

  const [ isCreateVisible, setIsCreateVisible ] = useState(false);
  const [ categories, setCategories ] = useState([])
  const [ sortBy, setSortBy ] = useState(null);
  const [ unsortedSortedData, setUnsortedData ] = useState([])
  const [ tableData, setTableData] = useState([]);
  const [ alert, setAlert ] = useState(null);
  const [ timerId, setTimerId ] = useState(null);

  console.log(tableData)
  const filteredData = async (filter) => {
    if (!filter) return setTableData(unsortedSortedData)

    await request(`/ecommerce/categories/${filter}`)
      .then(async (res) => {
        setTableData(res)
      });
  }

  const getTableData = async () => {
    if (sortBy) return filteredData(sortBy)

    const qs = require('qs');
    const query = qs.stringify(
      { orderBy: { id: 'asc' }, populate: ['parentCategory', 'image'] },
      { encodeValuesOnly: true }
    );

    await request(`/ecommerce/categories?${query}`)
      .then(async (res) => {
        setTableData(res)
        setUnsortedData(res)
        setCategories(res.map(el => el.name))
      });
  }

  const sortHandler = (value) => {
    setSortBy(value)
    filteredData(value)
  }

  const updateTableData = async (id, updateData) => {
    await request(`/ecommerce/categories/${id}`, {
      method: 'PUT',
      body: updateData
    }).then(() => getTableData());
  }

  const createCategory = async (data) => {
    await request(`/ecommerce/categories`, {
      method: 'POST',
      body: data
    }).then(() => {
      getTableData();
    });
  }

  useEffect(async () => {
    await getTableData();
  }, [])

  const deleteRow = async(id) => {
    await request(`/ecommerce/categories/${id}`, {
      method: 'DELETE',
    }).then(() => getTableData());
  }

  const alertHandler = (params) => {
    if (timerId) clearTimeout(timerId)

    const newTimerId = setTimeout(() => {
      setAlert(null)
    }, 3000)

    setTimerId(newTimerId)
    setAlert(params)
  }

  return (
    <main style={{ position: 'relative' }}>
      {
        alert &&
          <CustomAlert
            isActive={!!alert}
            closeAlert={() => setAlert(null)}
            title={alert.title}
            variant={alert.variant}
            text={alert.text}
            timerId={timerId}
          />
      }
      <HeaderLayout
        primaryAction={
          <Button
            startIcon={ <Plus/> }
            onClick={ () => setIsCreateVisible(true) }
          >
            Add category
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
                  onChange={ sortHandler }
                  onClear={ sortHandler }
                  >
                  { categories.map((entry, id) => <Option value={ entry } key={id}>{ entry }</Option>) }
                </Select>
              </GridItem>
            </Grid>
          </Stack>
          <Table rowCount={10} colCount={7}>
            <Thead>
              <Tr>
                <Th><Typography variant="sigma">ID</Typography></Th>
                <Th><Typography variant="sigma">Image</Typography></Th>
                <Th><Typography variant="sigma">Name</Typography></Th>
                <Th><Typography variant="sigma">Slug</Typography></Th>
                <Th><Typography variant="sigma">Parent</Typography></Th>
                <Th>
                  <Flex justifyContent={'center'}>
                    <Typography variant="sigma">Category level</Typography>
                  </Flex>
                </Th>
                <Th><Typography variant="sigma">Short description</Typography></Th>
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
                      publishAlert={(value) => alertHandler(value)}
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
