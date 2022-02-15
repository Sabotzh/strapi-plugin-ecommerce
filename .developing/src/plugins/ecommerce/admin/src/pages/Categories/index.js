import React, {useEffect, useState} from 'react';
import axios from 'axios';

import getTrad from '../../utils/getTrad';
import Create from './Create';
import RowTable from './RowTable';
import TableLoader from '../../components/TableLoader';
import TableEmptyModal from '../../components/TableEmptyModal';

import Plus from '@strapi/icons/Plus';
import { useIntl } from 'react-intl';
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

  const { formatMessage } = useIntl();
  const title = formatMessage({
    id: getTrad('categories.title'),
    defaultMessage: 'Categories',
  });

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

    const qs = require('qs');
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
      url: `http://localhost:1337/api/ecommerce/categories/${id}`,
      data
    })
      .then(async () => {
        await getData()
        return true
      })
      .catch(error => {
        notification({ type: 'warning', message: error.response.data })
        return false
      });
  }

  const create = async (data) => {
    return await axios({
      method: 'post',
      url: 'http://localhost:1337/api/ecommerce/categories',
      data
    })
      .then(async (res) => {
        data.publishedAt
          ? await publish(res.data.id, true)
          : await unPublish(res.data.id, true)
        await getData()
        return true
      })
      .catch((error) => {
        notification({ type: 'warning', message: error.response.data })
        return false
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
            Add category
          </Button>
        }
        title={title}
        subtitle={formatMessage({
          id: getTrad('categories.description'),
          defaultMessage: 'Configure the ecommerce plugin',
        })}
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
                  placeholder={formatMessage({
                    id: getTrad('categories.sort.title'),
                    defaultMessage: 'Filter by category',
                  })}
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
                      {
                        formatMessage({
                          id: getTrad('categories.table.header.image'),
                          defaultMessage: 'Image',
                        })
                      }
                    </Typography>
                  </Th>
                  <Th>
                    <Typography variant="sigma">
                      {
                        formatMessage({
                          id: getTrad('categories.table.header.name'),
                          defaultMessage: 'Name',
                        })
                      }
                    </Typography>
                  </Th>
                  <Th>
                    <Typography variant="sigma">
                      {
                        formatMessage({
                          id: getTrad('categories.table.header.slug'),
                          defaultMessage: 'Slug',
                        })
                      }
                    </Typography>
                  </Th>
                  <Th>
                    <Typography variant="sigma">
                      {
                        formatMessage({
                          id: getTrad('categories.table.header.parent'),
                          defaultMessage: 'Parent',
                        })
                      }
                    </Typography>
                  </Th>
                  <Th>
                    <Flex justifyContent={'center'}>
                      <Typography variant="sigma">
                        {
                          formatMessage({
                            id: getTrad('categories.table.header.categoryLevel'),
                            defaultMessage: 'Category Level',
                          })
                        }
                      </Typography>
                    </Flex>
                  </Th>
                  <Th>
                    <Typography variant="sigma">
                      {
                        formatMessage({
                          id: getTrad('categories.table.header.shortDescription'),
                          defaultMessage: 'Short Description',
                        })
                      }
                    </Typography>
                  </Th>
                  <Th>
                    <Typography variant="sigma">
                      {
                        formatMessage({
                          id: getTrad('categories.table.header.published'),
                          defaultMessage: 'Published',
                        })
                      }
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
