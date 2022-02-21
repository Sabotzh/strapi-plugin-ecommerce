import React, { useEffect, useState } from 'react';
import axios from 'axios';
const qs = require('qs');

import Translation from '../../components/Translation';
import Create from './Create';
import RowTable from './RowTable';
import TableLoader from '../../components/TableLoader';
import TableEmptyModal from '../../components/TableEmptyModal';

import Plus from '@strapi/icons/Plus';
import { request, useFocusWhenNavigate, useNotification } from '@strapi/helper-plugin';
import { ContentLayout, HeaderLayout } from '@strapi/design-system/Layout';
import { Stack } from '@strapi/design-system/Stack';
import { Option, Select } from '@strapi/design-system/Select';
import { Table, Tbody, Th, Thead, Tr } from '@strapi/design-system/Table';
import { Typography } from '@strapi/design-system/Typography';
import { VisuallyHidden } from '@strapi/design-system/VisuallyHidden';
import { Grid, GridItem } from '@strapi/design-system/Grid';
import { Button } from '@strapi/design-system/Button';
import { Flex } from '@strapi/design-system/Flex';


const CategoriesPage = () => {
  useFocusWhenNavigate();

  const [ data, setData] = useState([]);
  const [ unsortedData, setUnsortedData ] = useState([]);
  const [ createVisible, setCreateVisible ] = useState(false);
  const [ categories, setCategories ] = useState([]);
  const [ sortBy, setSortBy ] = useState(null);
  const [ loader, setLoader ] = useState(true);
  const notification = useNotification()

  const filteredData = async (filter) => {
    if (!filter) {
      setLoader(false);
      return setData(unsortedData);
    }
    await request(`/ecommerce/categories/${filter}`)
      .then((res) => {
        setData(res);
        setLoader(false);
      });
  }

  const getData = async () => {
    if (sortBy) return filteredData(sortBy);
    const query = qs.stringify(
      { orderBy: { id: 'asc' }, populate: ['parentCategory', 'image'] },
      { encodeValuesOnly: true }
    );

    await request(`/ecommerce/categories?${query}`)
      .then(async (res) => {
        setData(res);
        setUnsortedData(res);
        setCategories(res.map(el => el.name));
        setLoader(false);
      });
  }

  const sortHandler = (value) => {
    setSortBy(value);
    filteredData(value);
  }

  const update = async (id, data) => {
    return await axios({
      method: 'put',
      url: `${strapi.backendURL}/api/ecommerce/categories/${id}`,
      data
    })
      .then(async () => {
        await getData()
        notification({ type: 'success', message: 'Category updated' });
        return { success: true }
      })
      .catch(error => {
        notification({ type: 'warning', message: 'Category not updated' })
        return { success: false, data: error.response.data }
      });
  }

  const create = async (data) => {
    return await axios({
      method: 'post',
      url: `${strapi.backendURL}/api/ecommerce/categories`,
      data
    })
      .then(async (res) => {
        data.publishedAt
          ? await publish(res.data.id, true)
          : await unPublish(res.data.id, true)
        await getData()
        notification({ type: 'success', message: 'Category created' });
        return { success: true }
      })
      .catch((error) => {
        notification({ type: 'warning', message: 'Category not created' })
        return { success: false, data: error.response.data }
      })
  }

  useEffect(async () => {
    await getData();
  }, [])

  const remove = async(id) => {
    await request(`/ecommerce/categories/${id}`, {
      method: 'DELETE',
    }).then(() => getData());
  }

  const publish = async(id, silence) => {
    let response
    await request(`/ecommerce/categories/${id}/publish`, {
      method: 'PUT',
    })
      .then(() => {
        !silence && notification({ type: 'success', message: 'Category published' });
        response = true;
      })
      .catch(() => {
        !silence && notification({ type: 'warning', message: 'Category has not been published' });
        response = false;
      });
    return response
  }

  const unPublish = async(id, silence) => {
    let response
    await request(`/ecommerce/categories/${id}/un-publish`, {
      method: 'PUT',
    })
      .then(() => {
        !silence && notification({ type: 'success', message: 'Category unpublished' });
        response = false;
      })
      .catch(() => {
        !silence && notification({ type: 'warning', message: 'Category has not been unpublished' });
        response = true;
      });
    return response
  }

  return (
    <main style={{ position: 'relative' }}>
      <HeaderLayout
        primaryAction={
          <Button
            startIcon={ <Plus/> }
            onClick={ () => setCreateVisible(true) }
          >
            { <Translation id={'categories.button.add'} defaultMessage={'Add Category'}/> }
          </Button>
        }
        title={ <Translation id={'categories.title'} defaultMessage={'Categories'}/> }
        subtitle={ <Translation id={'categories.description'} defaultMessage={'Configure the ecommerce plugin'}/> }
      />
      { createVisible &&
        <Create
          onClose={ () => setCreateVisible(false) }
          data={ data }
          onCreate={ create }
        />
      }
      <ContentLayout>
        <Stack size={7}>
          <Stack size={3}>
            <Grid>
              <GridItem col={3}>
                <Select
                  placeholder={ <Translation id={'categories.sort.title'} defaultMessage={'Filter by category'}/> }
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
                <Th>
                  <Typography variant="sigma">
                    { <Translation id={'categories.table.header.image'} defaultMessage={'Image'}/> }
                  </Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">
                    { <Translation id={'categories.table.header.name'} defaultMessage={'Name'}/> }
                  </Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">
                    { <Translation id={'categories.table.header.slug'} defaultMessage={'Slug'}/> }
                  </Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">
                    { <Translation id={'categories.table.header.parent'} defaultMessage={'Parent'}/> }
                  </Typography>
                </Th>
                <Th>
                  <Flex justifyContent={'center'}>
                    <Typography variant="sigma">
                      { <Translation id={'categories.table.header.categoryLevel'} defaultMessage={'Category Level'}/> }
                    </Typography>
                  </Flex>
                </Th>
                <Th>
                  <Typography variant="sigma">
                    { <Translation id={'categories.table.header.shortDescription'} defaultMessage={'Short Description'}/> }
                  </Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">
                    { <Translation id={'categories.table.header.published'} defaultMessage={'Published'}/> }
                  </Typography>
                </Th>
                <Th><VisuallyHidden>Actions</VisuallyHidden></Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                loader && <TableLoader col={9}/>
              }
              {
                !loader &&
                  data.map(entry => {
                    return <Tr key={entry.id}>
                      <RowTable
                        data={ data }
                        rowData={ entry }
                        onUpdate={ update }
                        onDelete={ remove }
                        onPublish={ publish }
                        onUnPublish={ unPublish }
                      />
                    </Tr>
                  })
              }
              {
                !(data.length) && !loader &&
                <TableEmptyModal col={9} onClick={ () => setCreateVisible(true) }/>
              }
            </Tbody>
          </Table>
        </Stack>
      </ContentLayout>
    </main>
  );
};

export default CategoriesPage;
