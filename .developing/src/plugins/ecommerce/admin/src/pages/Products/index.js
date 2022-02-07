import React, { useState, useEffect } from 'react';

import getTrad from '../../utils/getTrad';
import RowTable from './RowTable';
import Create from './Create';
import Filter from "./Filter";

import Plus from '@strapi/icons/Plus';
import { useIntl } from 'react-intl';
import { useFocusWhenNavigate, request, useNotification  } from '@strapi/helper-plugin';
import { HeaderLayout, ContentLayout } from '@strapi/design-system/Layout';
import { Table, Thead, Tbody, Tr, Th } from '@strapi/design-system/Table';
import { Typography } from '@strapi/design-system/Typography';
import { VisuallyHidden } from "@strapi/design-system/VisuallyHidden";
import { Stack } from '@strapi/design-system/Stack';
import { Button } from '@strapi/design-system/Button';
import { Grid } from '@strapi/design-system/Grid';


const ProductsPage = () => {
  useFocusWhenNavigate();

  const { formatMessage } = useIntl();
  const title = formatMessage({
    id: getTrad('products.title'),
    defaultMessage: 'Products',
  });

  const [ data, setData ] = useState([]);
  const [ unSortedData, setUnSortedData ] = useState([])
  const [ categories, setCategories ] = useState([]);
  const [ createVisible, setCreateVisible ] = useState(false);
  const notification = useNotification()

  const getData = async () => {
    const qs = require('qs');
    const query = qs.stringify(
      { orderBy: { id: 'asc' }, populate: ['categories', 'image'] },
      { encodeValuesOnly: true }
    );

    await request(`/ecommerce/products?${query}`)
      .then((res) => {
        setData(res)
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
    await getData();
    await getCategories();
  }, []);


  const update = async (id, updateData) => {
    await request(`/ecommerce/products/${id}`, {
      method: 'PUT',
      body: updateData
    }).then(() => getData());
  }

  const remove = async(id) => {
    await request(`/ecommerce/products/${id}`, {
      method: 'DELETE',
    }).then(() => getData());
  }

  const create = async(data) => {
    await request(`/ecommerce/products`, {
      method: 'POST',
      body: data
    }).then((res) => {
      data.publishedAt
        ? publish(res.id).then(() => getData())
        : unPublish(res.id).then(() => getData())
    });
  }

  const publish = async(id) => {
    let response
    await request(`/ecommerce/products/${id}/publish`, {
      method: 'PUT',
    })
      .then(() => {
        notification({ type: 'success', message: 'Product published' });
        response = true;
      })
      .catch(() => {
        notification({ type: 'warning', message: 'Product has not been published' });
        response = false;
      });
    return response
  }

  const unPublish = async(id) => {
    let response
    await request(`/ecommerce/products/${id}/un-publish`, {
      method: 'PUT',
    })
      .then(() => {
        notification({ type: 'success', message: 'Product unpublished' });
        response = false;
      })
      .catch(() => {
        notification({ type: 'warning', message: 'Product has not been unpublished' });
        response = true;
      });
    return response
  }

  return (
    <main style={{position: 'relative'}}>
      <HeaderLayout
        primaryAction={
          <Button
            startIcon={ <Plus/> }
            onClick={ () => setCreateVisible(true) }
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
      { createVisible &&
        <Create
          onClose={ () => setCreateVisible(false) }
          allCategories={ categories }
          onCreate={ create }
        />
      }
      <ContentLayout>
        <Stack size={7}>
          <Grid gap={3}>
            <Filter
              filterValues={ [categories, [{ id: 1, name: 'Low to High' }, { id: 2, name: 'High to Low' }]] }
              unSortedData={ unSortedData }
              updateData={ setData }
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
                data.map(entry =>
                  <Tr key={entry.id}>
                    <RowTable
                      data = { entry }
                      onUpdate = { update }
                      onDelete = { remove }
                      categories = { categories }
                      onPublish={ publish }
                      onUnPublish={ unPublish }
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
