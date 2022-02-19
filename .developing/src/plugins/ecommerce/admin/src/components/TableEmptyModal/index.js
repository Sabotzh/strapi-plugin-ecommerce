import React from 'react'
import Illo from '../Illo';

import Plus from '@strapi/icons/Plus';
import { EmptyStateLayout } from '@strapi/design-system/EmptyStateLayout';
import { Button } from '@strapi/design-system/Button';
import { Td, Tr } from '@strapi/design-system/Table';

export default ({ col, onClick }) => {
  return (
    <Tr>
      <Td colSpan={col}>
        <EmptyStateLayout
          shadow={null}
          icon={<Illo/>}
          content="No content found"
          action={
            onClick ?
              <Button
                variant="secondary"
                startIcon={<Plus/>}
                onClick={ onClick }
              >
                Add product
              </Button> :
              null
          }
        />
      </Td>
    </Tr>
  )
}