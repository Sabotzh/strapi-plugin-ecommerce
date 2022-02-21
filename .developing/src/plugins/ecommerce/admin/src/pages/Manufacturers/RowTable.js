import React, { useState } from 'react';

import Edit from './Edit';
import TableRowButtons from '../../components/TableRowButtons';
import DialogDelete from '../../components/DialogDelete';

import { Td } from '@strapi/design-system/Table';
import { Typography } from '@strapi/design-system/Typography';
import { Avatar, Initials } from '@strapi/design-system/Avatar';
import { Switch } from '@strapi/design-system/Switch';


const RowTable = ({ data, onUpdate, onDelete, onPublish, onUnPublish }) => {
  const [ toggleSwitch, setToggleSwitch ] = useState(!!data.publishedAt);
  const [ visibleEdit, setVisibleEdit ] = useState(false);
  const [ visibleDelete, setVisibleDelete ] = useState(false);

  return (
    <>
      { visibleEdit &&
        <Edit
          onClose = { () => setVisibleEdit(false) }
          data = { data }
          onUpdateData = { onUpdate }
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
      <Td><Typography textColor="neutral800">{ data.shortDescription }</Typography></Td>
      <Td>
        <Switch
          label="Published"
          selected={ toggleSwitch }
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
