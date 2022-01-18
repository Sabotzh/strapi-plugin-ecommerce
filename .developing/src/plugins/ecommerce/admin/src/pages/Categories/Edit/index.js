import React, {useState} from "react";

import CollectionType from '@strapi/icons/CollectionType';

import { ModalLayout, ModalBody, ModalHeader, ModalFooter } from '@strapi/design-system/ModalLayout';
import { Box } from "@strapi/design-system/Box"
import { Stack } from "@strapi/design-system/Stack"
import { Breadcrumbs, Crumb } from '@strapi/design-system/Breadcrumbs';
import { Typography } from "@strapi/design-system/Typography";
import { Divider } from '@strapi/design-system/Divider';
import { TextInput } from '@strapi/design-system/TextInput';
import { Grid, GridItem } from '@strapi/design-system/Grid';
import { Option, Select } from "@strapi/design-system/Select";
import { Button } from '@strapi/design-system/Button'


const Edit = ({ rowData, closeHandler, updateRowData, tableData } ) => {
  const [ name, setName ] = useState(rowData.name)
  const [ selectParentName, setSelectParentName ] = useState(rowData.parent_category ? rowData.parent_category.name : null)
  const [ type, setType ] = useState(rowData.type)
  const [ slug, setSlug ] = useState(rowData.slug)

  return (
    <ModalLayout onClose={ () => closeHandler() } labelledBy="Edit">
      <ModalHeader>
        <Stack horizontal size={2}>
          <CollectionType/>
          <Breadcrumbs label="Category model, name field">
            <Crumb>Categories</Crumb>
            <Crumb>{ rowData.name }</Crumb>
          </Breadcrumbs>
        </Stack>
      </ModalHeader>
      <ModalBody>
        <Box paddingTop={4} paddingBottom={3}><Typography variant={'beta'}>Edit {rowData.name}</Typography></Box>
        <Divider/>
        <Box paddingTop={5}>
          <Grid gap={5}>
            <GridItem col={6}>
              <TextInput
                placeholder="Name"
                label="Name"
                error={ name.length < 1 ? 'Must be more than one character' : undefined }
                value={ name }
                onChange={ e => setName(e.target.value) }
                required={true}
              />
            </GridItem>
            <GridItem col={6}>
              <Select
                label={'Parent'}
                placeholder={'Parent'}
                value={ selectParentName }
                onChange={ setSelectParentName }
                onClear={() => setSelectParentName(null)}
              >
                { tableData.map((entry, id) => {
                  return <Option value={entry.name} key={entry.id}>{ entry.name }</Option>
                })}
              </Select>
            </GridItem>
            <GridItem col={6}>
              <TextInput
                placeholder="Type"
                label="Type"
                value={ type }
                onChange={ e => setType(e.target.value) }
                required={true}
              />
            </GridItem>
            <GridItem col={6}>
              <TextInput
                placeholder="Slug"
                label="Slug"
                value={ slug }
                onChange={ e => setSlug(e.target.value) }
                required={true}
              />
            </GridItem>
          </Grid>
        </Box>
      </ModalBody>
      <ModalFooter
        startActions = { <Button onClick = { () => closeHandler() } variant="tertiary"> Cancel </Button> }
        endActions = { <Button onClick = { () => {
          closeHandler()
          updateRowData(rowData.id, { name, slug, type, parent_category: parent ? tableData.parentId.id : null })
        }
        }> Finish </Button> }
      />
    </ModalLayout>
  )
}

export default Edit