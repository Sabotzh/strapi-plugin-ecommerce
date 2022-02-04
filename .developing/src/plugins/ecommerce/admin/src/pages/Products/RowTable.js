import React from 'react';
import Pencil from '@strapi/icons/Pencil';
import Trash from '@strapi/icons/Trash';
import styled from 'styled-components';
import ExclamationMarkCircle from '@strapi/icons/ExclamationMarkCircle';

import { useState, useRef } from 'react';
import Edit from './Edit';

import { Td } from '@strapi/design-system/Table';
import { Typography } from '@strapi/design-system/Typography';
import { Avatar } from '@strapi/design-system/Avatar';
import { Switch } from '@strapi/design-system/Switch';
import { Flex } from '@strapi/design-system/Flex';
import { IconButton } from '@strapi/design-system/IconButton';
import { Box } from '@strapi/design-system/Box';
import { Popover } from '@strapi/design-system/Popover';
import { Badge } from '@strapi/design-system/Badge';
import { SortIcon, stopPropagation } from '@strapi/helper-plugin';
import { Dialog, DialogBody, DialogFooter } from '@strapi/design-system/Dialog';
import { Stack } from '@strapi/design-system/Stack';
import { Button } from '@strapi/design-system/Button';


const BadgeStyled = styled(Typography)`
  background-color: ${props => props.backgroundColor};
  padding: 1.3px 10px;
  border-radius: 20px;
  color: ${props => props.color};
`;
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


const RowTable = ({ rowData, updateRowData, deleteRow, allCategories }) => {
  const [ toggleSwitch, setToggleSwitch ] = useState(!!rowData.publishedAt);
  const [ editOpen, setEditOpen ] = useState(false);
  const [ visible, setVisible ] = useState(false);
  const [ isDeleteVisible, setIsDeleteVisible ] = useState(false);

  const buttonRef = useRef();

  let badgeColor;
  let badgeBackgroundColor;
  switch (rowData.status) {
    case 'SELLING':
      badgeColor = '#4EB899';
      badgeBackgroundColor = '#DEF7EC';
      break;
    case 'ON_ORDER':
      badgeColor = '#DCA433';
      badgeBackgroundColor = '#FDF6B2';
      break;
    case 'UNAVAILABLE':
      badgeColor = '#4F9FFA';
      badgeBackgroundColor = '#E1EFFE';
  }

  const status = () => {
    if (rowData.status === 'SELLING') return 'Selling';
    if (rowData.status === 'ON_ORDER') return 'On order';
    if (rowData.status === 'UNAVAILABLE') return 'Unavailable';
  }

  const handleTogglePopover = () => setVisible(prev => !prev);


  return (
    <>
      { editOpen &&
        <Edit
          closeHandler = { () => setEditOpen(false) }
          rowData = { rowData }
          allCategories = { allCategories }
          updateRowData = { (id, data) => updateRowData(id, data) }
        />
      }
      <Dialog onClose={ () => setIsDeleteVisible(false) } title="Confirmation" isOpen={ isDeleteVisible }>
        <DialogBody icon={<ExclamationMarkCircle />}>
          <Stack size={2}>
            <Flex justifyContent="center">
              <Typography id="confirm-description">Are you sure you want to delete this?</Typography>
            </Flex>
          </Stack>
        </DialogBody>
        <DialogFooter
          startAction = {
            <Button onClick= { () => setIsDeleteVisible(false) } variant="tertiary">Cancel</Button>
          }
          endAction = {
            <Button onClick={ () => deleteRow(rowData.id) } variant="danger-light" startIcon={<Trash/>}>Confirm</Button>
          }
        />
      </Dialog>
      <Td><Typography textColor="neutral800">{ rowData.id }</Typography></Td>
      <Td><Avatar src = { rowData.icon } alt={''} /></Td>
      <Td><Typography textColor="neutral800">{ rowData.name }</Typography></Td>
      <Td><Typography textColor="neutral800">{ rowData.slug }</Typography></Td>
      <Td><Typography textColor="neutral800">{ rowData.sku }</Typography></Td>
      <Td>
        <Flex { ...stopPropagation }>
          <RelationCountBadge>{ rowData.categories.length }</RelationCountBadge>
          <Typography>items</Typography>
          { rowData.categories.length > 0 && (
            <ActionWrapper>
              <IconButton
                onClick={ handleTogglePopover }
                ref={ buttonRef }
                noBorder
                label='Display categories'
                icon={ <SortIcon isUp={visible} /> }
              />
              { visible && (
                <Popover source={ buttonRef } spacing={16} centered>
                  <ul style={{ width: '150px' }}>
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
      <Td><Typography textColor="neutral800">{ rowData.quantity || 0 }</Typography></Td>
      <Td><BadgeStyled color={ badgeColor } backgroundColor={ badgeBackgroundColor }>{ status() }</BadgeStyled></Td>
      <Td><Typography textColor="neutral800" fontWeight="bold">{ rowData.discount || 0  }%</Typography></Td>
      <Td>
        <Switch label="Published" selected={ toggleSwitch }
          onChange = { () => console.log(1) }
        />
      </Td>
      <Td>
        <Flex>
          <IconButton onClick={ () => setEditOpen(true) } label="Edit" noBorder icon = { <Pencil /> }/>
          <Box paddingLeft={1}>
            <IconButton
              label="Delete"
              noBorder
              icon={ <Trash/> }
              onClick={ () => setIsDeleteVisible(true) }
            />
          </Box>
        </Flex>
      </Td>
    </>
  );
};

export default RowTable;
