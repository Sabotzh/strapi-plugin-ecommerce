import React, { useState } from 'react'

import Edit from './Edit';

import Pencil from '@strapi/icons/Pencil';
import Trash from '@strapi/icons/Trash';
import ExclamationMarkCircle from '@strapi/icons/ExclamationMarkCircle';
import { Td } from '@strapi/design-system/Table';
import { Typography } from '@strapi/design-system/Typography';
import { Avatar, Initials } from '@strapi/design-system/Avatar';
import { Switch } from '@strapi/design-system/Switch';
import { Flex } from '@strapi/design-system/Flex';
import { IconButton } from '@strapi/design-system/IconButton';
import { Box } from '@strapi/design-system/Box';
import { Dialog, DialogBody, DialogFooter } from '@strapi/design-system/Dialog';
import { Stack } from '@strapi/design-system/Stack';
import { Button } from '@strapi/design-system/Button';


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
      <Dialog onClose={ () => setVisibleDelete(false) } title="Confirmation" isOpen={ visibleDelete }>
        <DialogBody icon={<ExclamationMarkCircle />}>
          <Stack size={2}>
            <Flex justifyContent="center">
              <Typography id="confirm-description">Are you sure you want to delete this?</Typography>
            </Flex>
          </Stack>
        </DialogBody>
        <DialogFooter
          startAction = {
            <Button onClick= { () => setVisibleDelete(false) } variant="tertiary">Cancel</Button>
          }
          endAction = {
            <Button
              onClick={ () => {
                setVisibleDelete(false)
                onDelete(rowData.id)
              }}
              variant="danger-light"
              startIcon={<Trash/>}
            >
              Confirm
            </Button>
          }
        />
      </Dialog>
      <Td><Typography textColor="neutral800">{ rowData.id }</Typography></Td>
      <Td>
        { rowData.image?.url
          ? <Avatar src={rowData.image?.url} alt={data.name}/>
          : <Initials>{ rowData.name.split(' ').map((word, i) => i < 2 ? word[0]: '').join('') }</Initials> }
      </Td>
      <Td><Typography textColor="neutral800">{ rowData.name }</Typography></Td>
      <Td><Typography textColor="neutral800">{ rowData.slug }</Typography></Td>
      <Td><Typography textColor="neutral800">{ rowData.parentCategory?.name }</Typography></Td>
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
          onChange = {
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
        <Flex>
          <IconButton onClick={ () => setVisibleEdit(true) } label="Edit" noBorder icon = { <Pencil /> }/>
          <Box paddingLeft={1}>
            <IconButton
              label="Delete"
              noBorder
              icon={ <Trash/> }
              onClick={ () => setVisibleDelete(true) }
            />
          </Box>
        </Flex>
      </Td>
    </>
  );
};

export default RowTable;
