import React, { useState } from 'react';

import Edit from './Edit';
import Pencil from '@strapi/icons/Pencil';
import { Td } from '@strapi/design-system/Table';
import { Typography } from '@strapi/design-system/Typography';
import { IconButton } from '@strapi/design-system/IconButton';
import { Flex } from '@strapi/design-system/Flex';


const RowTable = ({ data, onUpdate }) => {
  const [ editVisible, setEditVisible ] = useState(false);

  return (
    <>
      { editVisible &&
        <Edit
          onClose = { () => setEditVisible(false) }
          data = { data }
          onUpdate = { onUpdate }
        />
      }
      <Td><Typography textColor="neutral800">{ data.id }</Typography></Td>
      <Td><
        Typography textColor="neutral800">
          { data.firstname + ' ' + data.middlename + ' ' + data.lastname }
        </Typography>
      </Td>
      <Td><Typography textColor="neutral800">{ data.email }</Typography></Td>
      <Td><Typography textColor="neutral800">{ data.phone }</Typography></Td>
      <Td>
        <Flex justifyContent={'center'}>
          <Typography textColor="neutral800">{ data.attachedToUser }</Typography>
        </Flex>
      </Td>
      <Td>
        <Flex justifyContent={'flex-end'}>
          <IconButton onClick={ () => setEditVisible(true) } label="Edit" noBorder icon = { <Pencil /> }/>
        </Flex>
      </Td>
    </>
  );
};

export default RowTable;
