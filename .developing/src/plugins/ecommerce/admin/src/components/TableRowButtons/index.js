import React from 'react';
import Translation from '../Translation';

import Pencil from '@strapi/icons/Pencil';
import Trash from '@strapi/icons/Trash';
import { Flex } from '@strapi/design-system/Flex';
import { Box } from '@strapi/design-system/Box';
import { IconButton } from '@strapi/design-system/IconButton';


const TableRowButtons = ({ onEdit, onDelete }) => {
  return (
    <Flex>
      <IconButton
        label={ <Translation id={'button.edit'} defaultMessage={'Edit'}/> }
        noBorder
        icon={ <Pencil /> }
        onClick={ onEdit }
      />
      <Box paddingLeft={1}>
        <IconButton
          label={ <Translation id={'button.delete'} defaultMessage={'Delete'}/> }
          noBorder
          icon={ <Trash/> }
          onClick={ onDelete }
        />
      </Box>
    </Flex>
  )
}

export default TableRowButtons