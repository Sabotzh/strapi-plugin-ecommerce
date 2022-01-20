import React from 'react'
import Pencil from "@strapi/icons/Pencil";
import Trash from "@strapi/icons/Trash";
import styled from "styled-components"

import { useState, useRef } from 'react'
import Edit from "./Edit";

import { Td } from "@strapi/design-system/Table";
import { Typography } from "@strapi/design-system/Typography";
import { Avatar } from "@strapi/design-system/Avatar";
import { Switch } from "@strapi/design-system/Switch";
import { Flex } from "@strapi/design-system/Flex";
import { IconButton } from "@strapi/design-system/IconButton";
import { Box } from "@strapi/design-system/Box";
import { Popover } from '@strapi/design-system/Popover';
import { Badge } from '@strapi/design-system/Badge';
import { SortIcon, stopPropagation } from '@strapi/helper-plugin';


const BadgeStyled = styled(Typography)`
  background-color: ${props => props.backgroundColor};
  padding: 1.3px 10px;
  border-radius: 20px;
  color: ${props => props.color};
`
const RelationCountBadge = styled(Badge)`
  display: flex;
  align-items: center;
  margin-right: 3px;
`;

const ActionWrapper = styled.span`
  svg {
    height: ${4 / 16}rem;
  }
`;


const RowTable = (props) => {
  const rowData = props.rowData

  const [ issued, setIssued ] = useState(rowData.published)
  const [ editOpen, setEditOpen ] = useState(false)
  const [ visible, setVisible ] = useState(false);
  const buttonRef = useRef();

  let badgeColor
  let badgeBackgroundColor
  switch (rowData.status) {
    case 'SELLING':
      badgeColor = '#4EB899'
      badgeBackgroundColor = '#DEF7EC'
      break
    case 'ON_ORDER':
      badgeColor = '#DCA433'
      badgeBackgroundColor = '#FDF6B2'
      break
    case 'UNAVAILABLE':
      badgeColor = '#4F9FFA'
      badgeBackgroundColor = '#E1EFFE'
  }

  const status = () => {
    if (rowData.status === 'SELLING') return 'Selling'
    if (rowData.status === 'ON_ORDER') return 'On order'
    if (rowData.status === 'UNAVAILABLE') return 'Unavailable'
  }

  const handleTogglePopover = () => setVisible(prev => !prev);

  return (
    <>
      { editOpen &&
        <Edit
          closeHandler = { () => setEditOpen(false) }
          rowData = { rowData }
          updateRowData = { (dataRow, idRow) => props.updateRowData(dataRow, idRow) }
        />
      }
      <Td><Typography textColor="neutral800">{ rowData.sku }</Typography></Td>
      <Td><Avatar src = { rowData.icon } alt={''} /></Td>
      <Td><Typography textColor="neutral800">{ rowData.name }</Typography></Td>
      <Td>
        <Flex {...stopPropagation}>
          <RelationCountBadge>{ rowData.categories.length }</RelationCountBadge>
          <Typography>items</Typography>
          { rowData.categories.length > 0 && (
            <ActionWrapper>
              <IconButton
                onClick={handleTogglePopover}
                ref={buttonRef}
                noBorder
                label='Display categories'
                icon={ <SortIcon isUp={visible} /> }
              />
              { visible && (
                <Popover source={ buttonRef } spacing={16} centered>
                  <ul style={{ width: '200px' }}>
                    { rowData.categories.map((el, id) => {
                      return (
                      <Box key={id} padding={3} as="li">
                        <Typography textColor="neutral800">{ el.name }</Typography>
                      </Box>)})}
                  </ul>
                </Popover>)}
            </ActionWrapper>)}
        </Flex>
      </Td>
      <Td><Typography textColor="neutral800" fontWeight="bold">$ { rowData.price }</Typography></Td>
      <Td><Typography textColor="neutral800">{ rowData.quantity }</Typography></Td>
      <Td><BadgeStyled color={ badgeColor } backgroundColor={ badgeBackgroundColor}>{ status() }</BadgeStyled></Td>
      <Td><Typography textColor="neutral800">{ rowData.discount }%</Typography></Td>
      <Td>
        <Switch label="Published" selected={ issued } onChange={() => {
          setIssued(!issued)
          props.updateRowData({...rowData, published: !issued}, rowData.sku)
        }} />
      </Td>
      <Td>
        <Flex>
          <IconButton onClick={ () => setEditOpen(true) } label="Edit" noBorder icon = { <Pencil /> }/>
          <Box paddingLeft={1}>
            <IconButton
              label="Delete"
              noBorder
              icon={ <Trash/> }
              onClick={ () => props.deleteRow(rowData.sku) }
            />
          </Box>
        </Flex>
      </Td>
    </>
  )
}
export default RowTable