import React, { useState, useRef } from 'react';
import styled from 'styled-components';

import Edit from './Edit';
import TableRowButtons from '../../components/TableRowButtons';
import DialogDelete from '../../components/DialogDelete';

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
  const [ visibleEdit, setVisibleEdit ] = useState(false);
  const [ categoriesVisible, setCategoriesVisible ] = useState(false);
  const [ visibleDelete, setVisibleDelete ] = useState(false);

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
      { visibleEdit &&
        <Edit
          onClose = { () => setVisibleEdit(false) }
          data = { data }
          allCategories = { categories }
          allManufacturers = { manufacturers }
          onUpdate = { onUpdate }
        />
      }
      <DialogDelete
        onClose={ () => setVisibleDelete(false) }
        onDelete={ () => onDelete(data.id) }
        isOpen={ visibleDelete }
      />
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
                    {
                      data.categories.map((el, id) => {
                        return (
                          <Box key={id} padding={3} as="li">
                            <Typography textColor="neutral800">{ el.name }</Typography>
                          </Box>
                        )
                      })
                    }
                  </ul>
                </Popover>)}
            </ActionWrapper>)}
        </Flex>
      </Td>
      <Td><Typography textColor="neutral800">{ data.manufacturer?.name || '-' }</Typography></Td>
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
        <TableRowButtons
          onEdit={ () => setVisibleEdit(true) }
          onDelete={ () => setVisibleDelete(true) }
        />
      </Td>
    </>
  );
};

export default RowTable;
