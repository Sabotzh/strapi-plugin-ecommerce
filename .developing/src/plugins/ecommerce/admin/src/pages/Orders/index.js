import React, {useState} from 'react';

import { useIntl } from 'react-intl';

import { useFocusWhenNavigate } from '@strapi/helper-plugin';
import { HeaderLayout, ContentLayout } from '@strapi/design-system/Layout';

import getTrad from '../../utils/getTrad';
import { Table, Tbody, Th, Thead, Tr } from "@strapi/design-system/Table";
import { Typography } from '@strapi/design-system/Typography';
import { Stack } from '@strapi/design-system/Stack'
import RowTable from './RowTable';
import { Option, Select } from '@strapi/design-system/Select';

const OrdersPage = () => {
  useFocusWhenNavigate();

  const [ tableData, setTableData ] = useState([
    {
      id: 'D0E1',
      time: 'Dec 18, 2021',
      address: 'Address A',
      phone: '2324523414',
      method: 'COD',
      amount: '$75.00',
      status: 'pending',
    },
    {
      id: '0B1D',
      time: 'Dec 18, 2021',
      address: 'Address B',
      phone: '87985675',
      method: 'COD',
      amount: '$183.00',
      status: 'delivered',
    },
    {
      id: '7865',
      time: 'Dec 18, 2021',
      address: 'Address C',
      phone: '23247897414',
      method: 'COD',
      amount: '$186.00',
      status: 'pending',
    },
    {
      id: '7825',
      time: 'Dec 19, 2021',
      address: 'Address D',
      phone: '280014523123',
      method: 'COD',
      amount: '$132.00',
      status: 'processing',
    }
  ]);
  const [ sortBy, setSortBy ] = useState();

  const tableDataUpdate = (updatedRow, idUpdatedRow) => {
    const updatedTableData = tableData.map(row => {
      if (row.id === idUpdatedRow) {
        return updatedRow;
      }
      return row;
    });
    setTableData(updatedTableData);
  }

  const sortData = (sortCategory) => {
    setSortBy(sortCategory);
    sortCategory = sortCategory.toLowerCase();
    setTableData(tableData.sort((a, b) => {
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
          title={title}
          subtitle={formatMessage({
            id: getTrad('orders.description'),
            defaultMessage: 'Configure the ecommerce plugin',
          })}
        />
        <ContentLayout>
          <Stack size={7}>
            <Stack horizontal size={3}>
              <Select
                placeholder={'Sort by status'}
                value={ sortBy }
                onChange={ sortData }
                onClear={ () => setSortBy(null) }
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
                  tableData.map(entry =>
                    <Tr key={entry.id}>
                      <RowTable
                        rowData = { entry }
                        updateRowData = { tableDataUpdate }
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

export default OrdersPage;
