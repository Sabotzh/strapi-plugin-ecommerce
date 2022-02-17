import React from 'react'

import { Flex } from '@strapi/design-system/Flex';
import { Loader } from '@strapi/design-system/Loader';

const PopupLoader = ({ loader, children }) => {
  return (
    <>
      { loader
        ? (
          <Flex
            width={'100%'}
            height={'65vh'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Loader/>
          </Flex>
        )
        : (
          children
        )
      }
    </>
  )
}

export default PopupLoader