import React from "react";

import CollectionType from '@strapi/icons/CollectionType';

import { ModalLayout, ModalBody, ModalHeader, ModalFooter } from '@strapi/design-system/ModalLayout';
import { Box } from "@strapi/design-system/Box"
import { Stack } from "@strapi/design-system/Stack"
import { Breadcrumbs, Crumb } from '@strapi/design-system/Breadcrumbs';


const Edit = (props) => {
  return (
    <ModalLayout onClose={ () => props.closeHandler() } labelledBy="Edit">
      <ModalHeader>
        <Stack horizontal size={2}>
          <CollectionType/>
          <Breadcrumbs label="Category model, name field">
            <Crumb>Products</Crumb>
            <Crumb>{ props.rowData.productName }</Crumb>
          </Breadcrumbs>
        </Stack>
      </ModalHeader>
      <ModalBody>
        <Box>SPACE</Box>
      </ModalBody>
    </ModalLayout>
  )
}

export default Edit