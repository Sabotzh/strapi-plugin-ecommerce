import React, { useState, useEffect } from 'react';
import axios from "axios";

import RowTable from './RowTable';
import Create from './Create'
import getTrad from '../../utils/getTrad';
import TableLoader from '../../components/TableLoader';
import TableEmptyModal from '../../components/TableEmptyModal';

import Plus from '@strapi/icons/Plus';
const qs = require('qs');
import { useIntl } from 'react-intl';
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
  const [ loader, setLoader ] = useState(true)
  const notification = useNotification()

  const { formatMessage } = useIntl();
  const title = formatMessage({
    id: getTrad('manufacturer.title'),
    defaultMessage: 'Manufacturers',
  });

  const getData = async () => {
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
    return await axios({
      method: 'post',
      url: `${strapi.backendURL}/api/ecommerce/manufacturer`,
      data
    })
      .then(async (res) => {
        data.publishedAt
          ? await publish(res.data.id, true)
          : await unPublish(res.data.id, true)
        await getData()
        return { success: true }
      })
      .catch((error) => {
        notification({ type: 'warning', message: 'Manufacturer not created' })
        return { success: false, data: error.response.data }
      })
  }

  const update = async(id, data) => {
    return await axios({
      method: 'put',
      url: `${strapi.backendURL}/api/ecommerce/manufacturer/${id}`,
      data
    })
      .then(async () => {
        await getData()
        return { success: true }
      })
      .catch(error => {
        notification({ type: 'warning', message: 'Manufacturer not updated' })
        return { success: false, data: error.response.data }
      })
  }

  const remove = async(id) => {
    await request(`/ecommerce/manufacturer/${id}`, {
      method: 'DELETE'
    }).then(() => getData())
  }

  const publish = async(id, silence) => {
    let response
    await request(`/ecommerce/manufacturer/${id}/publish`, {
      method: 'PUT',
    })
      .then(() => {
        !silence && notification({ type: 'success', message: 'Manufacturer published' });
        response = true;
      })
      .catch(() => {
        !silence && notification({ type: 'warning', message: 'Manufacturer has not been published' });
        response = false;
      });
    return response
  }

  const unPublish = async(id, silence) => {
    let response
    await request(`/ecommerce/manufacturer/${id}/un-publish`, {
      method: 'PUT',
    })
      .then(() => {
        !silence && notification({ type: 'success', message: 'Manufacturer unpublished' });
        response = false;
      })
      .catch(() => {
        !silence && notification({ type: 'warning', message: 'Manufacturer has not been unpublished' });
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
            <Table colCount={9} rowCount={15}>
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
                  loader && <TableLoader col={7}/>
                }
                {
                  !loader &&
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
                {
                  !(data.length) && !loader &&
                  <TableEmptyModal col={9} onClick={ () => setCreateVisible(true) }/>
                }
              </Tbody>
            </Table>
          </Stack>
        </ContentLayout>
      </main>
    </>
  );
};

export default ManufacturerPage;
