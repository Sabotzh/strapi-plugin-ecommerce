import React, { useState } from 'react'

import Edit from './Edit';
import TableRowButtons from '../../components/TableRowButtons';
import DialogDelete from '../../components/DialogDelete';

import { Td } from '@strapi/design-system/Table';
import { Typography } from '@strapi/design-system/Typography';
import { Avatar, Initials } from '@strapi/design-system/Avatar';
import { Switch } from '@strapi/design-system/Switch';
import { Flex } from '@strapi/design-system/Flex';


const RowTable = ({ rowData, data, onUpdate, onDelete, onPublish, onUnPublish }) => {
  const [ toggleSwitch, setToggleSwitch ] = useState(!!rowData.publishedAt);
  const [ visibleEdit, setVisibleEdit ] = useState(false);
  const [ visibleDelete, setVisibleDelete ] = useState(false);

  return (
    <>
      { visibleEdit &&
        <Edit
          onClose = { () => setVisibleEdit(false) }
          rowData = { rowData }
          tableData = { data }
          updateRowData = { (id, data) => onUpdate(id, data) }
        />
      }
      <DialogDelete
        onClose={ () => setVisibleDelete(false) }
        onDelete={ () => onDelete(rowData.id) }
        isOpen={ visibleDelete }
      />
      <Td><Typography textColor="neutral800">{ rowData.id }</Typography></Td>
      <Td>
        { rowData.image?.url
          ? <Avatar src={rowData.image?.url} alt={rowData.name}/>
          : <Initials>{ rowData.name.split(' ').map((word, i) => i < 2 ? word[0]: '').join('') }</Initials> }
      </Td>
      <Td><Typography textColor="neutral800">{ rowData.name }</Typography></Td>
      <Td><Typography textColor="neutral800">{ rowData.slug }</Typography></Td>
      <Td><Typography textColor="neutral800">{ rowData.parentCategory?.name || '-' }</Typography></Td>
      <Td><Typography textColor="neutral800">
        <Flex justifyContent={'center'}>
          { rowData.categoryLevel }
        </Flex>
      </Typography></Td>
      <Td><Typography textColor="neutral800">{ rowData.shortDescription }</Typography></Td>
      <Td>
        <Switch
          label="Published"
          selected={ toggleSwitch }
          onChange={
            async () => {
              setToggleSwitch(!toggleSwitch)
              toggleSwitch
                ? setToggleSwitch(await onUnPublish(rowData.id))
                : setToggleSwitch(await onPublish(rowData.id))
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
