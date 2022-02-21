import React, { useState, useEffect} from 'react';
import axios from 'axios';

import getTrad from '../../utils/getTrad';
import RowTable from './RowTable';
import TableLoader from '../../components/TableLoader';
import TableEmptyModal from '../../components/TableEmptyModal';

import { useIntl } from 'react-intl';
import { useNotification } from '@strapi/helper-plugin';
import { useFocusWhenNavigate } from '@strapi/helper-plugin';
import { HeaderLayout, ContentLayout } from '@strapi/design-system/Layout';
import { Table, Tbody, Th, Thead, Tr } from "@strapi/design-system/Table";
import { Typography } from '@strapi/design-system/Typography';
import { Stack } from '@strapi/design-system/Stack'
import { Option, Select } from '@strapi/design-system/Select';
import Translation from "../../components/Translation";
const qs = require('qs');


const OrdersPage = () => {
  useFocusWhenNavigate();

  const [ data, setData ] = useState([]);
  const [ sortBy, setSortBy ] = useState();
  const [ loader, setLoader ] = useState(true);
  const notification = useNotification()

  const getData = async () => {
    const query = qs.stringify(
      { orderBy: { id: 'asc' }, populate: ['customer'] },
      { encodeValuesOnly: true }
    );
    const { data } = await axios.get(`${strapi.backendURL}/api/ecommerce/orders?${query}`)
    setData(data)
    setLoader(false)
  }
  useEffect(() => {
    getData()
  }, [])

  const changeStatus = async (id, status) => {
    return await axios({
      method: 'put',
      url: `${strapi.backendURL}/api/ecommerce/orders/status/${id}`,
      data: { status }
    })
      .then(async (res) => {
        await getData();
        notification({ type: 'success', message: 'Status changed' });
        return res;
      })
      .catch(error => {
        notification({ type: 'warning', message: 'Status not changed' });
        return error;
      })
  }

  const sortData = (sortCategory) => {
    setSortBy(sortCategory);

    if (!sortCategory) {
      setData(data.sort((a, b) => {
        return a.id - b.id
      }))
      return
    }

    sortCategory = sortCategory.toUpperCase();
    setData(data.sort((a, b) => {
      if (a.status === sortCategory && b.status === sortCategory) return 0;
      if (a.status === sortCategory && b.status !== sortCategory) return -1;
      return 1;
    }));
  }

  const { formatMessage } = useIntl();
  const title = formatMessage({
    id: getTrad('orders.title'),
    defaultMessage: 'Orders',
  });

  return (
    <>
      <main>
        <HeaderLayout
          title={ <Translation id={'orders.title'} defaultMessage={'Orders'}/> }
          subtitle={ <Translation id={'orders.description'} defaultMessage={'Configure the ecommerce plugin'}/> }
        />
        <ContentLayout>
          <Stack size={7}>
            <Stack horizontal size={3}>
              <Select
                placeholder={ <Translation id={'orders.filter.title'} defaultMessage={'Sort by status'}/> }
                value={ sortBy }
                onChange={ sortData }
                onClear={ sortData }
              >
                { ['Pending', 'Delivered', 'Processing'].map((entry, id) => <Option value={entry} key={id}>{ entry }</Option>) }
              </Select>
            </Stack>
            <Table colCount={8} rowCount={15}>
              <Thead>
                <Tr>
                  <Th><Typography variant="sigma">Order ID</Typography></Th>
                  <Th><Typography variant="sigma">Time</Typography></Th>
                  <Th><Typography variant="sigma">Shipping Address</Typography></Th>
                  <Th><Typography variant="sigma">Phone</Typography></Th>
                  <Th><Typography variant="sigma">Method</Typography></Th>
                  <Th><Typography variant="sigma">Amount</Typography></Th>
                  <Th><Typography variant="sigma">Status</Typography></Th>
                  <Th><Typography variant="sigma">Action</Typography></Th>
                </Tr>
              </Thead>
              <Tbody>
                {
                  loader && <TableLoader col={8}/>
                }
                {
                  !loader &&
                    data.map(entry =>
                      <Tr key={entry.id}>
                        <RowTable
                          data = { entry }
                          onStatusChange = { changeStatus }
                        />
                      </Tr>
                    )
                }
                {
                  !(data.length) && !loader &&
                  <TableEmptyModal col={9}/>
                }
              </Tbody>
            </Table>
          </Stack>
        </ContentLayout>
      </main>
    </>
  );
};

export default OrdersPage;
