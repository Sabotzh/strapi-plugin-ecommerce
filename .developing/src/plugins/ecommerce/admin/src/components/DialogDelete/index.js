import React from 'react';
import Translation from '../Translation';

import Trash from '@strapi/icons/Trash';
import ExclamationMarkCircle from '@strapi/icons/ExclamationMarkCircle';
import { Dialog, DialogBody, DialogFooter } from '@strapi/design-system/Dialog';
import { Stack } from '@strapi/design-system/Stack';
import { Button } from '@strapi/design-system/Button';
import { Flex } from '@strapi/design-system/Flex';
import { Typography } from '@strapi/design-system/Typography';


const DialogDelete = ({ onClose, onDelete, isOpen }) => {
  return (
    <Dialog onClose={ onClose } title="Confirmation" isOpen={ isOpen }>
      <DialogBody icon={<ExclamationMarkCircle />}>
        <Stack size={2}>
          <Flex justifyContent="center">
            <Typography id="confirm-description">
              { <Translation id={'dialog.deleteText'} defaultMessage={'Are you sure you want to delete this?'}/> }
            </Typography>
          </Flex>
        </Stack>
      </DialogBody>
      <DialogFooter
        startAction = {
          <Button onClick= { onClose } variant="tertiary">
            { <Translation id={'dialog.button.cancel'} defaultMessage={'Cancel'}/> }
          </Button>
        }
        endAction = {
          <Button
            onClick={ () => {
              onClose()
              onDelete()
            }}
            variant="danger-light"
            startIcon={<Trash/>}
          >
            { <Translation id={'dialog.button.confirm'} defaultMessage={'Confirm'}/> }
          </Button>
        }
      />
    </Dialog>
  )
}

export default DialogDelete