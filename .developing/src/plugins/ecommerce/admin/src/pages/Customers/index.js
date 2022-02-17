import React, { useState, useEffect } from 'react';
import axios from "axios";

import getTrad from '../../utils/getTrad';
import RowTable from './RowTable';
import TableLoader from '../../components/TableLoader'
import TableEmptyModal from '../../components/TableEmptyModal';

import { useIntl } from 'react-intl';
import { Stack } from '@strapi/design-system/Stack';
import { Option, Select } from '@strapi/design-system/Select';
import { Grid, GridItem } from '@strapi/design-system/Grid';
import { request, useNotification  } from '@strapi/helper-plugin';
import { HeaderLayout, ContentLayout } from '@strapi/design-system/Layout';
import { Table, Thead, Tbody, Tr, Th } from '@strapi/design-system/Table';
import { VisuallyHidden } from "@strapi/design-system/VisuallyHidden";
import { Typography } from '@strapi/design-system/Typography';

const ProductsPage = () => {
  const [ filter, setFilter ] = useState('Is not shadow')
  const [ loader, setLoader ] = useState(true);
  const [ data, setData ] = useState([]);
  const [ unsortedData, setUnsortedData ] = useState([]);
  const notification = useNotification();
  const { formatMessage } = useIntl();

  const dataFilter = (value) => {
    setFilter(value)
    if (!value) setData(unsortedData)
    if (value === 'Shadow') setData(unsortedData.filter(el => !!el.isShadow))
    if (value === 'Is not shadow') setData(unsortedData.filter(el => !el.isShadow))
  }

  const getData = async () => {
    await request(`/ecommerce/customers/admin-panel`)
      .then((res) => {
        setData(res.filter(el => !el.isShadow))
        setUnsortedData(res)
        setLoader(false)
      });
  }

  useEffect(async () => {
    getData();
  }, []);


  const update = async (id, data) => {
    return await axios({
      method: 'put',
      url: `http://localhost:1337/api/ecommerce/customer/admin-panel/${id}`,
      data
    })
      .then(async () => {
        await getData()
        notification({ type: 'success', message: 'Customer updated' });
        return true
      })
      .catch(() => {
        notification({ type: 'success', message: 'Customer not updated' });
        return false
      });
  }

  return (
    <main style={{position: 'relative'}}>
      <HeaderLayout
        title={formatMessage({
          id: getTrad('customers.title'),
          defaultMessage: 'Customers',
        })}
        subtitle={formatMessage({
          id: getTrad('customers.description'),
          defaultMessage: 'Configure the ecommerce plugin',
        })}
      />
      <ContentLayout>
        <Stack size={7}>
          <Stack size={3}>
            <Grid>
              <GridItem col={3}>
                <Select
                  placeholder={formatMessage({
                    id: getTrad('customers.filter.title'),
                    defaultMessage: 'Filter',
                  })}
                  value={ filter }
                  onChange={ dataFilter }
                  onClear={ dataFilter }
                >
                  {
                    ['Shadow', 'Is not shadow'].map((entry, id) => {
                      return <Option value={entry} key={id}>{entry}</Option>
                    })
                  }
                </Select>
              </GridItem>
            </Grid>
          </Stack>
          <Table colCount={12} rowCount={15}>
            <Thead>
              <Tr>
                <Th><Typography variant="sigma">ID</Typography></Th>
                <Th><Typography variant="sigma">Name</Typography></Th>
                <Th><Typography variant="sigma">Email</Typography></Th>
                <Th><Typography variant="sigma">Phone</Typography></Th>
                <Th style={{ display: 'flex', justifyContent: 'center' }}>
                  <Typography variant="sigma">attached To User</Typography>
                </Th>
                <Th><VisuallyHidden>Actions</VisuallyHidden></Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                loader && <TableLoader col={6}/>
              }
              {
                !loader &&
                data.map(entry =>
                  <Tr key={entry.id}>
                    <RowTable
                      data={entry}
                      onUpdate={update}
                    />
                  </Tr>
                )
              }
              {
                !(data.length) && !loader && <TableEmptyModal col={6}/>
              }
            </Tbody>
          </Table>
        </Stack>
      </ContentLayout>
    </main>
  );
};

export default ProductsPage;
