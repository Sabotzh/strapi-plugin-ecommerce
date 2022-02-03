import React from 'react';
import Pencil from '@strapi/icons/Pencil';
import Trash from '@strapi/icons/Trash';
import ExclamationMarkCircle from '@strapi/icons/ExclamationMarkCircle';

import { useState } from 'react';
// import Edit from './Edit';

import { Td } from '@strapi/design-system/Table';
import { Typography } from '@strapi/design-system/Typography';
import { Avatar, Initials } from '@strapi/design-system/Avatar';
import { Switch } from '@strapi/design-system/Switch';
import { Flex } from '@strapi/design-system/Flex';
import { IconButton } from '@strapi/design-system/IconButton';
import { Box } from '@strapi/design-system/Box';
import { request } from '@strapi/helper-plugin';
import { Dialog, DialogBody, DialogFooter } from '@strapi/design-system/Dialog';
import { Stack } from '@strapi/design-system/Stack';
import { Button } from '@strapi/design-system/Button';


const RowTable = ({ data, onUpdateData, onDeleteData }) => {
  console.log('FF', data)
  const [ toggleSwitch, setToggleSwitch ] = useState(!!data.publishedAt);
  const [ visibleEdit, setVisibleEdit ] = useState(false);
  const [ visibleDelete, setVisibleDelete ] = useState(false);

  const publishUpdate = async () => {
    await request(`/ecommerce/manufacturer/${data.id}/publish`, {
      method: 'PUT',
    })
      // .then(() => publishAlert({ variant: 'success', title: 'Success', text: 'Product published' }))
      // .catch(() => publishAlert({ variant: 'danger', title: 'Error', text: 'Product has not been published' }));
  }

  const unPublishUpdate = async () => {
    await request(`/ecommerce/manufacturer/${data.id}/un-publish`, {
      method: 'PUT',
    })
      // .then(() => publishAlert({ variant: 'success', title: 'Success', text: 'Product unpublished' }))
      // .catch(() => publishAlert({ variant: 'danger', title: 'Error', text: 'Product has not been unpublished' }));
  }

  return (
    <>
      { visibleEdit &&
        <Edit
          closeHandler = { () => setVisibleEdit(false) }
          data = { data }
          onUpdateData = { onUpdateData }
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
            <Button onClick={ () => onDeleteData(data.id) } variant="danger-light" startIcon={<Trash/>}>Confirm</Button>
          }
        />
      </Dialog>
      <Td><Typography textColor="neutral800">{ data.id }</Typography></Td>
      <Td>
        { data.image?.url
          ? <Avatar src={data.image?.url} alt={data.name}/>
          : <Initials>{ data.name.split(' ').map((word, i) => i < 2 ? word[0]: '') }</Initials> }
      </Td>
      <Td><Typography textColor="neutral800">{ data.name }</Typography></Td>
      <Td><Typography textColor="neutral800">{ data.slug }</Typography></Td>
      <Td><Typography textColor="neutral800">{ data.shortDescription }</Typography></Td>
      <Td>
        <Switch
          label="Published"
          selected={ toggleSwitch }
          onChange = {
            () => {
              toggleSwitch ?  unPublishUpdate() : publishUpdate()
              setToggleSwitch(!toggleSwitch)
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
