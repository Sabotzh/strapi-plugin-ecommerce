import React from 'react';
import styled from 'styled-components';

import { Td } from '@strapi/design-system/Table';
import { Typography } from '@strapi/design-system/Typography';
import { Badge } from '@strapi/design-system/Badge';

import Edit from './Edit';


const BadgeStyled = styled(Badge)`
  background-color: ${props => props.backgroundColor};
  padding: 2.5px 10px;
  border-radius: 20px;
  span {
    color: ${props => props.color};
  }
`;

const RowTable = ({ data, onStatusChange }) => {
  let badgeColor;
  let badgeBackgroundColor;
  switch (data.status) {
    case 'PENDING':
      badgeColor = '#DCA433';
      badgeBackgroundColor = '#FDF6B2';
      break;
    case 'DELIVERED':
      badgeColor = '#4EB899';
      badgeBackgroundColor = '#DEF7EC';
      break;
    case 'PROCESSING':
      badgeColor = '#4F9FFA';
      badgeBackgroundColor = '#E1EFFE';
  }

  const time = new Date(data.time).toDateString().slice(4).split(' ').join(', ')
  return (
    <>
      <Td><Typography fontWeight={'bold'} textColor="neutral800">{ data.id }</Typography></Td>
      <Td><Typography textColor="neutral800">{ time }</Typography></Td>
      <Td><Typography textColor="neutral800">{ data.shippingAddress }</Typography></Td>
      <Td><Typography textColor="neutral800">{ data.customer?.phone || '-' }</Typography></Td>
      <Td><Typography fontWeight={'bold'} textColor="neutral800">{ data.paymentMethod }</Typography></Td>
      <Td><Typography fontWeight={'bold'} textColor="neutral800">${ data.price }</Typography></Td>
      <Td><BadgeStyled color={ badgeColor } backgroundColor={ badgeBackgroundColor}>{ data.status }</BadgeStyled></Td>
      <Td><Edit data = { data } onStatusChange = { onStatusChange }/></Td>
    </>
  )
}
export default RowTable
