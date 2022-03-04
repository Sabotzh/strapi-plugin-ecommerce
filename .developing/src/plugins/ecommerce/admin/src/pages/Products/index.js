import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import RowTable from './RowTable';
import Create from './Create';
import Filter from './Filter';
import TableLoader from '../../components/TableLoader'
import TableEmptyModal from '../../components/TableEmptyModal';
import Translation from '../../components/Translation';
import Import from '../../components/Import';

import Plus from '@strapi/icons/Plus';
import Upload from '@strapi/icons/Upload';
import Download from '@strapi/icons/Download';
import { request, useNotification  } from '@strapi/helper-plugin';
import { HeaderLayout, ContentLayout } from '@strapi/design-system/Layout';
import { Table, Thead, Tbody, Tr, Th } from '@strapi/design-system/Table';
import { Typography } from '@strapi/design-system/Typography';
import { VisuallyHidden } from "@strapi/design-system/VisuallyHidden";
import { Stack } from '@strapi/design-system/Stack';
import { Button } from '@strapi/design-system/Button';
import { Grid } from '@strapi/design-system/Grid';


const ProductsPage = () => {
  const [ createVisible, setCreateVisible ] = useState(false);
  const [ importVisible, setImportVisible ] = useState(false)
  const [ unSortedData, setUnSortedData ] = useState([]);
  const [ categories, setCategories ] = useState([]);
  const [ manufacturers, setManufacturers ] = useState([]);
  const [ loader, setLoader ] = useState(true);
  const [ data, setData ] = useState([]);
  const notification = useNotification();
  const filter = useRef();

  const getData = async () => {
    const qs = require('qs');
    const query = qs.stringify(
      { orderBy: { id: 'asc' }, populate: ['categories', 'image', 'manufacturer'] },
      { encodeValuesOnly: true }
    );

    await request(`/ecommerce/products?${query}`)
      .then((res) => {
        setData(res)
        setUnSortedData(res)
        if (filter.current.runFilter(data)) {
          setLoader(false)
          return
        }
        setLoader(false)
      });
  }

  const getCategories = async () => {
    await request(`/ecommerce/categories`)
      .then((res) => setCategories(res));
  }

  const getManufacturers = async () => {
    await request(`/ecommerce/manufacturer`)
      .then((res) => {
        setManufacturers(res)
      });
  }

  useEffect(async () => {
    Promise.all([getData(), getCategories(), getManufacturers()])
  }, []);


  const update = async (id, data) => {
    return await axios({
      method: 'put',
      url: `http://localhost:1337/api/ecommerce/products/${id}`,
      data
    })
      .then(async () => {
        await getData();
        notification({ type: 'success', message: 'Product updated' });
        return { success: true }
      })
      .catch(error => {
        notification({ type: 'warning', message: 'Product not updated' })
        return { success: false, data: error.response.data }
      });
  }

  const remove = async(id) => {
    await request(`/ecommerce/products/${id}`, {
      method: 'DELETE',
    }).then(() => getData());
  }

  const create = async(data) => {
    return await axios({
      method: 'post',
      url: 'http://localhost:1337/api/ecommerce/products',
      data
    })
      .then(async (res) => {
        data.publishedAt
          ? await publish(res.data.id, true)
          : await unPublish(res.data.id, true);
        await getData()
        notification({ type: 'success', message: 'Product created' });
        return { success: true }
      })
      .catch((error) => {
        notification({ type: 'warning', message: 'Product not created' });
        return { success: false, data: error.response.data };
      })
  }

  const publish = async(id, silence) => {
    let response
    await request(`/ecommerce/products/${id}/publish`, {
      method: 'PUT',
    })
      .then(() => {
        !silence && notification({ type: 'success', message: 'Product published' });
        response = true;
      })
      .catch(() => {
        !silence && notification({ type: 'warning', message: 'Product has not been published' });
        response = false;
      });
    return response
  }

  const unPublish = async(id, silence) => {
    let response
    await request(`/ecommerce/products/${id}/un-publish`, {
      method: 'PUT',
    })
      .then(() => {
        !silence && notification({ type: 'success', message: 'Product unpublished' });
        response = false;
      })
      .catch(() => {
        !silence && notification({ type: 'warning', message: 'Product has not been unpublished' });
        response = true;
      });
    return response
  }

  return (
    <main style={{ position: 'relative' }}>
      <HeaderLayout
        primaryAction={
          <Stack horizontal size={3}>
            <Button
              startIcon={ <Download/> }
              onClick={ () => setImportVisible(true) }
            >
              <Translation id={'products.button.export'} defaultMessage={'Export'}/>
            </Button>
            <Button
              startIcon={ <Upload/> }
              onClick={ () => setImportVisible(true) }
            >
              <Translation id={'products.button.import'} defaultMessage={'Import'}/>
            </Button>
            <Button
              startIcon={ <Plus/> }
              onClick={ () => setCreateVisible(true) }
            >
              <Translation id={'products.button.add'} defaultMessage={'Add Product'}/>
            </Button>
          </Stack>
        }
        title={ <Translation id={'products.title'} defaultMessage={'Products'}/> }
        subtitle=<Translation id={'products.description'} defaultMessage={'Configure the ecommerce plugin'}/>
      />
      { importVisible &&
        <Import
          onClose={ () => setImportVisible(false) }
        />
      }
      { createVisible &&
        <Create
          onClose={ () => setCreateVisible(false) }
          allCategories={ categories }
          allManufacturers={ manufacturers }
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
              refFilter={ filter }
            />
          </Grid>
          <Table colCount={12} rowCount={15}>
            <Thead>
              <Tr>
                <Th><Typography variant="sigma">ID</Typography></Th>
                <Th>
                  <Typography variant="sigma">
                    <Translation id={'products.table.header.image'} defaultMessage={'image'}/>
                  </Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">
                    <Translation id={'products.table.header.name'} defaultMessage={'Product name'}/>
                  </Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">
                    <Translation id={'products.table.header.slug'} defaultMessage={'Slug'}/>
                  </Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">SKU</Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">
                    <Translation id={'products.table.header.category'} defaultMessage={'Category'}/>
                  </Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">
                    <Translation id={'products.table.header.manufacturer'} defaultMessage={'Manufacturer'}/>
                  </Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">
                    <Translation id={'products.table.header.price'} defaultMessage={'Price'}/>
                  </Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">
                    <Translation id={'products.table.header.quantity'} defaultMessage={'Quantity'}/>
                  </Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">
                    <Translation id={'products.table.header.status'} defaultMessage={'Status'}/>
                  </Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">
                    <Translation id={'products.table.header.discount'} defaultMessage={'Discount'}/>
                  </Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">
                    <Translation id={'products.table.header.published'} defaultMessage={'Published'}/>
                  </Typography>
                </Th>
                <Th><VisuallyHidden>Actions</VisuallyHidden></Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                loader && <TableLoader col={12}/>
              }
              {
                !loader &&
                  data.map(entry =>
                    <Tr key={entry.id}>
                      <RowTable
                        data={entry}
                        onUpdate={update}
                        onDelete={remove}
                        categories={categories}
                        manufacturers={manufacturers}
                        onPublish={publish}
                        onUnPublish={unPublish}
                      />
                    </Tr>
                  )
              }
              {
                !(data.length) && !loader && <TableEmptyModal col={12} onClick={ () => setCreateVisible(true) }/>
              }
            </Tbody>
          </Table>
        </Stack>
      </ContentLayout>
    </main>
  );
};

export default ProductsPage;
