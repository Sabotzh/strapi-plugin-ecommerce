import React from 'react'

import { Flex } from '@strapi/design-system/Flex';
import { Loader } from '@strapi/design-system/Loader';
import { Td, Tr } from '@strapi/design-system/Table';

export default ({ col }) => {
  return (
    <Tr>
      <Td colSpan={ col }>
        <Flex
          width={'100%'}
          height={'150px'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Loader>Loading content...</Loader>
        </Flex>
      </Td>
    </Tr>
  )
}