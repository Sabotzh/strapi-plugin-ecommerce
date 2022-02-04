import React, { useState, useEffect } from 'react';
const qs = require('qs');
import { useIntl } from 'react-intl';

import RowTable from './RowTable';
import Create from './Create'
import getTrad from '../../utils/getTrad';

import Plus from '@strapi/icons/Plus';
import { Loader } from '@strapi/design-system/Loader';
import { Flex } from '@strapi/design-system/Flex';
import { useFocusWhenNavigate } from '@strapi/helper-plugin';
import { HeaderLayout, ContentLayout } from '@strapi/design-system/Layout';
import { Button } from '@strapi/design-system/Button';
import { Table, Thead, Tbody, Tr, Th } from '@strapi/design-system/Table';
import { Typography } from '@strapi/design-system/Typography';
import { VisuallyHidden } from "@strapi/design-system/VisuallyHidden";
import { Stack } from '@strapi/design-system/Stack';
import { request, useNotification } from '@strapi/helper-plugin';


const ManufacturerPage = () => {
  useFocusWhenNavigate();

  const [ data, setData ] = useState([])
  const [ createVisible, setCreateVisible ] = useState(false)
  const [ loader, setLoader ] = useState(false)
  const notification = useNotification()

  const { formatMessage } = useIntl();
  const title = formatMessage({
    id: getTrad('manufacturer.title'),
    defaultMessage: 'Manufacturer',
  });

  const getData = async () => {
    setLoader(true)
    const query = qs.stringify(
      { orderBy: { id: 'asc' }, populate: ['image'] },
      { encodeValuesOnly: true }
    );
    await request(`/ecommerce/manufacturer?${query}`)
      .then((res) => {
        setData(res)
        setLoader(false)
      })
  }

  const create = async(data) => {
    await request(`/ecommerce/manufacturer`, {
      method: 'POST',
      body: data,
    }).then((res) => {
      data.publishedAt
        ? publish(res.id).then(() => getData())
        : unPublish(res.id).then(() => getData())
    })
  }

  const update = async(id, data) => {
    await request(`/ecommerce/manufacturer/${id}`, {
      method: 'PUT',
      body: data
    }).then(() => getData())
  }

  const remove = async(id) => {
    await request(`/ecommerce/manufacturer/${id}`, {
      method: 'DELETE'
    }).then(() => getData())
  }

  const publish = async(id) => {
    let response
    await request(`/ecommerce/manufacturer/${id}/publish`, {
      method: 'PUT',
    })
      .then(() => {
        notification({ type: 'success', message: 'Manufacturer published' });
        response = true;
      })
      .catch(() => {
        notification({ type: 'warning', message: 'Manufacturer has not been published' });
        response = false;
      });
    return response
  }

  const unPublish = async(id) => {
    let response
    await request(`/ecommerce/manufacturer/${id}/un-publish`, {
      method: 'PUT',
    })
      .then(() => {
        notification({ type: 'success', message: 'Manufacturer unpublished' });
        response = false;
      })
      .catch(() => {
        notification({ type: 'warning', message: 'Manufacturer has not been unpublished' });
        response = true;
      });
    return response
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <main>
        <HeaderLayout
          primaryAction={
            <Button
              startIcon={ <Plus/> }
              onClick={ () => setCreateVisible(true) }
            >
              Add manufacturer
            </Button>
          }
          title={title}
          subtitle={formatMessage({
            id: getTrad('manufacturer.description'),
            defaultMessage: 'Configure the ecommerce plugin',
          })}
        />
        { createVisible && (
          <Create
            data={data}
            onClose={() => setCreateVisible(false)}
            onCreate={ create }
          />
        )}
        <ContentLayout>
          <Stack size={7}>
            { loader
              ?
                <Flex
                  width={'100%'}
                  height={'300px'}
                  justifyContent={'center'}
                  alignItems={'center'}
                >
                  <Loader/>
                </Flex>
              : <Table colCount={9} rowCount={15}>
                <Thead>
                  <Tr>
                    <Th><Typography variant="sigma">ID</Typography></Th>
                    <Th><Typography variant="sigma">Image</Typography></Th>
                    <Th><Typography variant="sigma">Name</Typography></Th>
                    <Th><Typography variant="sigma">Slug</Typography></Th>
                    <Th><Typography variant="sigma">Short Description</Typography></Th>
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
                          onDelete={ remove }
                          onUpdate={ update }
                          onPublish={ publish }
                          onUnPublish={ unPublish }
                        />
                      </Tr>
                    )
                  }
                </Tbody>
              </Table>
            }
          </Stack>
        </ContentLayout>
      </main>
    </>
  );
};

export default ManufacturerPage;
