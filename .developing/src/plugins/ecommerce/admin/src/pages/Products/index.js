import React, { useState, useEffect } from 'react';

import getTrad from '../../utils/getTrad';
import RowTable from './RowTable';
import Create from './Create';
import Filter from "./Filter";

import Plus from '@strapi/icons/Plus';

import { useIntl } from 'react-intl';
import { useFocusWhenNavigate, request  } from '@strapi/helper-plugin';
import { HeaderLayout, ContentLayout } from '@strapi/design-system/Layout';
import { Table, Thead, Tbody, Tr, Th } from '@strapi/design-system/Table';
import { Typography } from '@strapi/design-system/Typography';
import { VisuallyHidden } from "@strapi/design-system/VisuallyHidden";
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

  const [ tableData, setTableData ] = useState([]);
  const [ unSortedData, setUnSortedData ] = useState([])
  const [ categories, setCategories ] = useState([]);
  const [ isVisible, setIsVisible ] = useState(false);
  const [ timerId, setTimerId ] = useState(null);


  const getTableData = async () => {
    const qs = require('qs');
    const query = qs.stringify(
      { orderBy: { id: 'asc' }, populate: ['categories'] },
      { encodeValuesOnly: true }
    );

    await request(`/ecommerce/products?${query}`)
      .then((res) => {
        setTableData(res)
        setUnSortedData(res)
      });
  }

  const getCategories = async () => {
    await request(`/ecommerce/categories`)
      .then((res) => {
        setCategories(res);
      });
  }

  useEffect(async () => {
    await getTableData();
    await getCategories();
  }, []);


  const updateTableData = async (id, updateData) => {
    await request(`/ecommerce/products/${id}`, {
      method: 'PUT',
      body: updateData
    }).then(() => getTableData());
  }

  const deleteRow = async(id) => {
    await request(`/ecommerce/products/${id}`, {
      method: 'DELETE',
    }).then(() => getTableData());
  }

  const postProduct = async(data) => {
    await request(`/ecommerce/products`, {
      method: 'POST',
      body: data
    }).then(() => getTableData());
  }

  return (
    <main style={{position: 'relative'}}>
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
          allCategories={ categories }
          postProduct= { postProduct }
        />
      }
      <ContentLayout>
        <Stack size={7}>
          <Grid gap={3}>
            <Filter
              filterValues={ [categories, [{ id: 1, name: 'Low to High' }, { id: 2, name: 'High to Low' }]] }
              unSortedData={ unSortedData }
              updateData={ setTableData }
            />
          </Grid>

          <Table colCount={9} rowCount={15}>
            <Thead>
              <Tr>
                <Th><Typography variant="sigma">ID</Typography></Th>
                <Th><Typography variant="sigma">Icon</Typography></Th>
                <Th><Typography variant="sigma">Product name</Typography></Th>
                <Th><Typography variant="sigma">Slug</Typography></Th>
                <Th><Typography variant="sigma">SKU</Typography></Th>
                <Th><Typography variant="sigma">Category</Typography></Th>
                <Th><Typography variant="sigma">Price</Typography></Th>
                <Th><Typography variant="sigma">Quantity</Typography></Th>
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
