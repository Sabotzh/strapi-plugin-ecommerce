import React from 'react'
import styled from 'styled-components'

import { Td } from "@strapi/design-system/Table";
import { Typography } from "@strapi/design-system/Typography";
import { Badge } from '@strapi/design-system/Badge';

import Edit from './Edit'


const BadgeStyled = styled(Badge)`
  background-color: ${props => props.backgroundColor};
  padding: 2.5px 10px;
  border-radius: 20px;
  span {
    color: ${props => props.color};
  }
`
const RowTable = (props) => {
  const rowData = props.rowData

  let badgeColor
  let badgeBackgroundColor
  switch (rowData.status) {
    case 'pending':
      badgeColor = '#DCA433'
      badgeBackgroundColor = '#FDF6B2'
      break
    case 'delivered':
      badgeColor = '#4EB899'
      badgeBackgroundColor = '#DEF7EC'
      break
    case 'processing':
      badgeColor = '#4F9FFA'
      badgeBackgroundColor = '#E1EFFE'
  }

  return (
    <>
      <Td><Typography fontWeight={'bold'} textColor="neutral800">{ rowData.id }</Typography></Td>
      <Td><Typography textColor="neutral800">{ rowData.time }</Typography></Td>
      <Td><Typography textColor="neutral800">{ rowData.address }</Typography></Td>
      <Td><Typography textColor="neutral800">{ rowData.phone }</Typography></Td>
      <Td><Typography fontWeight={'bold'} textColor="neutral800">{ rowData.method }</Typography></Td>
      <Td><Typography fontWeight={'bold'} textColor="neutral800">{ rowData.amount }</Typography></Td>
      <Td><BadgeStyled color={ badgeColor } backgroundColor={ badgeBackgroundColor}>{ rowData.status }</BadgeStyled></Td>
      <Td><Edit rowData = { rowData } updateRowData = { props.updateRowData }/></Td>
    </>
  )
}
export default RowTable