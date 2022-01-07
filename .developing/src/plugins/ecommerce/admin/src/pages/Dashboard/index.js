import React from 'react';

import { useIntl } from 'react-intl';

import { useFocusWhenNavigate } from '@strapi/helper-plugin';
import { ContentLayout, HeaderLayout } from '@strapi/design-system/Layout';
import { Table, Thead, Tbody, TFooter, Tr, Td, Th } from '@strapi/design-system/Table';
import { Typography } from '@strapi/design-system/Typography';
import { Grid, GridItem } from '@strapi/design-system/Grid';
import { Box } from '@strapi/design-system/Box';
import { VisuallyHidden } from '@strapi/design-system/VisuallyHidden'
import { Stack } from '@strapi/design-system/Stack';
import { Flex } from '@strapi/design-system/Flex';

import getTrad from '../../utils/getTrad';
import StatisticItem from "./StatisticItem";
import { Approve, Car, Card, Clock } from "./Icons";


const DashboardPage = () => {
  useFocusWhenNavigate();

  const { formatMessage } = useIntl();
  const title = formatMessage({
    id: getTrad('dashboard.title'),
    defaultMessage: 'Dashboard',
  });

  const statisticTopItem = [
    {
      title: 'Total Orders',
      data: '1205',
      img: <Card />,
      color: '#F5C443'
    },
    {
      title: 'Order Pending',
      data: '48',
      img: <Clock />,
      color: '#43A0F5'
    },
    {
      title: 'Order Processing',
      data: '193',
      img: <Car />,
      color: '#72F543'
    },
    {
      title: 'Order Delivered',
      data: '961',
      img: <Approve />,
      color: '#2AED3E'
    }
  ]

  const tableData = [
    {
    orderTime: '25.01.22 15:30',
    deliveryAddress: 'Lviv',
    phone: '+384953748317',
    paymentMethod: 'cash',
    orderAmount: 5,
    status: 'in storage'
    },
    {
      orderTime: '25.01.22 15:30',
      deliveryAddress: 'Lviv',
      phone: '+384953748317',
      paymentMethod: 'cash',
      orderAmount: 5,
      status: 'in storage'
    },
    {
      orderTime: '25.01.22 15:30',
      deliveryAddress: 'Lviv',
      phone: '+384953748317',
      paymentMethod: 'cash',
      orderAmount: 5,
      status: 'in storage'
    },
  ];

  return (
    <main>
      <HeaderLayout
        title={title}
        subtitle={formatMessage({
          id: getTrad('dashboard.description'),
          defaultMessage: 'Configure the ecommerce plugin',
        })}
      />
      <ContentLayout>
        <Stack size={7}>
          <Grid gap={7}>
            {statisticTopItem.map((el, id) => {
              return (
                <GridItem col={3} key={id}>
                  <StatisticItem padding={5} background={'neutral0'} shadow="filterShadow" hasRadius>
                    <Flex>
                      <Box style={{ backgroundColor: el.color, width: '39px', height: '39px' }} padding={2} hasRadius>{ el.img }</Box>
                      <Flex paddingLeft={3} direction={'column'} alignItems={'start'}>
                        <Box>
                          <Typography style={{ fontSize: '10px', color: '#525267' }}>{ el.title }</Typography>
                        </Box>
                        <Box>
                          <Typography variant={'alpha'} style={{ fontSize: '22px', color: '#32324D' }}>{ el.data }</Typography>
                         </Box>
                      </Flex>
                    </Flex>
                  </StatisticItem>
                </GridItem>
              )
            })}
            <GridItem col={6}>
              <Box padding={7} background={'neutral0'} shadow="filterShadow" hasRadius style={{ height: '320px' }}>SPACE</Box>
            </GridItem>
            <GridItem col={6}>
              <Box padding={7} background={'neutral0'} shadow="filterShadow" hasRadius style={{ height: '320px' }}>SPACE</Box>
            </GridItem>
          </Grid>
          <Table colCount={5} rowCount={8}>
            <Thead>
              <Tr>
                <Th>
                  <Typography variant="sigma">ID</Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">Order Time</Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">Delivery Address</Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">Phone</Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">Payment Method</Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">Order Amount</Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">Status</Typography>
                </Th>
                <Th>
                  {<VisuallyHidden>Actions</VisuallyHidden>}
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {tableData.map((elem, id) => <Tr key={id++}>
                <Td>
                  <Typography>{id++}</Typography>
                </Td>
                <Td>
                  <Typography>{elem.orderTime}</Typography>
                </Td>
                <Td>
                  <Typography>{elem.deliveryAddress}</Typography>
                </Td>
                <Td>
                  <Typography>{elem.phone}</Typography>
                </Td>
                <Td>
                  <Typography>{elem.paymentMethod}</Typography>
                </Td>
                <Td>
                  <Typography>{elem.orderAmount}</Typography>
                </Td>
                <Td>
                  <Typography>{elem.status}</Typography>
                </Td>
              </Tr>)}
            </Tbody>
          </Table>
        </Stack>
      </ContentLayout>
    </main>
  );
};

export default DashboardPage;
