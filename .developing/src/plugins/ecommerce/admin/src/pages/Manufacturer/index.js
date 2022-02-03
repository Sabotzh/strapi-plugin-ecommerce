import React, { useState, useEffect } from 'react';
const qs = require('qs');

import RowTable from "./RowTable";
import { useIntl } from 'react-intl';
import Plus from '@strapi/icons/Plus';

import { useFocusWhenNavigate } from '@strapi/helper-plugin';
import { HeaderLayout, ContentLayout } from '@strapi/design-system/Layout';
import { Button } from '@strapi/design-system/Button';
import { Table, Thead, Tbody, Tr, Th } from '@strapi/design-system/Table';
import { Typography } from '@strapi/design-system/Typography';
import { VisuallyHidden } from "@strapi/design-system/VisuallyHidden";
import { Stack } from '@strapi/design-system/Stack';
import { request } from '@strapi/helper-plugin';

import getTrad from '../../utils/getTrad';

const ManufacturerPage = () => {
  const [ data, setData ] = useState([])
  console.log(data)
  useFocusWhenNavigate();

  const { formatMessage } = useIntl();
  const title = formatMessage({
    id: getTrad('manufacturer.title'),
    defaultMessage: 'Manufacturer',
  });

  const getData = async () => {
    const query = qs.stringify(
      { orderBy: { id: 'asc' }, populate: ['image'] },
      { encodeValuesOnly: true }
    );
    await request(`/ecommerce/manufacturer?${query}`)
      .then((res) => setData(res))
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
              onClick={ () => console.log('Add') }
            >
              Add product
            </Button>
          }
          title={title}
          subtitle={formatMessage({
            id: getTrad('manufacturer.description'),
            defaultMessage: 'Configure the ecommerce plugin',
          })}
        />
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
                  data.map(entry =>
                    <Tr key={entry.id}>
                      <RowTable
                        data = { entry }
                        onDeleteData={ () => console.log("DELETE") }
                        onUpdateData={ () => console.log("UPDATE") }
                      />
                    </Tr>
                  )
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
