import React from 'react';
import Pencil from '@strapi/icons/Pencil';
import Trash from '@strapi/icons/Trash';
import styled from 'styled-components';
import ExclamationMarkCircle from '@strapi/icons/ExclamationMarkCircle';

import { useState, useRef } from 'react';
import Edit from './Edit';

import { Td } from '@strapi/design-system/Table';
import { Typography } from '@strapi/design-system/Typography';
import { Avatar, Initials } from '@strapi/design-system/Avatar';
import { Switch } from '@strapi/design-system/Switch';
import { Flex } from '@strapi/design-system/Flex';
import { IconButton } from '@strapi/design-system/IconButton';
import { Box } from '@strapi/design-system/Box';
import { Popover } from '@strapi/design-system/Popover';
import { Badge } from '@strapi/design-system/Badge';
import { SortIcon } from '@strapi/helper-plugin';
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


const RowTable = ({ data, onUpdate, onDelete, categories, manufacturers, onPublish, onUnPublish }) => {
  const [ toggleSwitch, setToggleSwitch ] = useState(!!data.publishedAt);
  const [ editVisible, setEditVisible ] = useState(false);
  const [ categoriesVisible, setCategoriesVisible ] = useState(false);
  const [ deleteVisible, setDeleteVisible ] = useState(false);

  const buttonRef = useRef();
  const handleTogglePopover = () => setCategoriesVisible(prev => !prev);

  document.addEventListener('mouseup', (e) => {
    if (buttonRef.current !== e.target) setCategoriesVisible(false)
  })

  let badgeColor;
  let badgeBackgroundColor;
  switch (data.status) {
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
    if (data.status === 'SELLING') return 'Selling';
    if (data.status === 'ON_ORDER') return 'On order';
    if (data.status === 'UNAVAILABLE') return 'Unavailable';
  }

  return (
    <>
      { editVisible &&
        <Edit
          onClose = { () => setEditVisible(false) }
          data = { data }
          allCategories = { categories }
          allManufacturers = { manufacturers }
          onUpdate = { onUpdate }
        />
      }
      <Dialog onClose={ () => setDeleteVisible(false) } title="Confirmation" isOpen={ deleteVisible }>
        <DialogBody icon={<ExclamationMarkCircle />}>
          <Stack size={2}>
            <Flex justifyContent="center">
              <Typography id="confirm-description">Are you sure you want to delete this?</Typography>
            </Flex>
          </Stack>
        </DialogBody>
        <DialogFooter
          startAction = {
            <Button onClick= { () => setDeleteVisible(false) } variant="tertiary">Cancel</Button>
          }
          endAction = {
            <Button onClick={ () => onDelete(data.id) } variant="danger-light" startIcon={<Trash/>}>Confirm</Button>
          }
        />
      </Dialog>
      <Td><Typography textColor="neutral800">{ data.id }</Typography></Td>
      <Td>
        { data.image?.url
        ? <Avatar src={data.image?.url} alt={data.name}/>
        : <Initials>{ data.name.split(' ').map((word, i) => i < 2 ? word[0]: '').join('') }</Initials> }
      </Td>
      <Td><Typography textColor="neutral800">{ data.name }</Typography></Td>
      <Td><Typography textColor="neutral800">{ data.slug }</Typography></Td>
      <Td><Typography textColor="neutral800">{ data.sku }</Typography></Td>
      <Td>
        <Flex>
          <RelationCountBadge>{ data.categories.length }</RelationCountBadge>
          <Typography>items</Typography>
          { data.categories.length > 0 && (
            <ActionWrapper>
              <IconButton
                onClick={ handleTogglePopover }
                ref={ buttonRef }
                noBorder
                label='Display categories'
                icon={ <SortIcon isUp={categoriesVisible} /> }
              />
              { categoriesVisible && (
                <Popover source={ buttonRef } spacing={16} centered>
                  <ul style={{ width: '150px' }}>
                    { data.categories.map((el, id) => {
                      return (
                      <Box key={id} padding={3} as="li">
                        <Typography textColor="neutral800">{ el.name }</Typography>
                      </Box>)})}
                  </ul>
                </Popover>)}
            </ActionWrapper>)}
        </Flex>
      </Td>
      <Td><Typography textColor="neutral800">{ data.manufacturer?.name }</Typography></Td>
      <Td><Typography textColor="neutral800" fontWeight="bold">$ { data.price }</Typography></Td>
      <Td><Typography textColor="neutral800">{ data.quantity || 0 }</Typography></Td>
      <Td><BadgeStyled color={ badgeColor } backgroundColor={ badgeBackgroundColor }>{ status() }</BadgeStyled></Td>
      <Td><Typography textColor="neutral800" fontWeight="bold">{ data.discount || 0  }%</Typography></Td>
      <Td>
        <Switch label="Published" selected={ toggleSwitch }
          onChange = {
            async () => {
              setToggleSwitch(!toggleSwitch)
              toggleSwitch
                ? setToggleSwitch(await onUnPublish(data.id))
                : setToggleSwitch(await onPublish(data.id))
            }
          }
        />
      </Td>
      <Td>
        <Flex>
          <IconButton onClick={ () => setEditVisible(true) } label="Edit" noBorder icon = { <Pencil /> }/>
          <Box paddingLeft={1}>
            <IconButton
              label="Delete"
              noBorder
              icon={ <Trash/> }
              onClick={ () => setDeleteVisible(true) }
            />
          </Box>
        </Flex>
      </Td>
    </>
  );
};

export default RowTable;
