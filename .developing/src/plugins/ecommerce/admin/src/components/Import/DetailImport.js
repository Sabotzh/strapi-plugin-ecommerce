import React from 'react';
import getTrad from "../../utils/getTrad";

import { Typography } from '@strapi/design-system/Typography';
import { Button } from '@strapi/design-system/Button';
import { ModalBody, ModalHeader, ModalFooter } from '@strapi/design-system/ModalLayout';
import { useIntl } from 'react-intl';

const DetailImport = ({ onClose, file }) => {
  const { formatMessage } = useIntl();

  return (
    <>
      <ModalHeader>
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
          Detail
        </Typography>
      </ModalHeader>
      <ModalBody>

      </ModalBody>
      <ModalFooter
        startActions={
          <Button onClick={onClose} variant="tertiary">
            {formatMessage({ id: 'app.components.Button.cancel', defaultMessage: 'cancel' })}
          </Button>
        }
        endActions={
          <Button>
            {formatMessage({
              id: getTrad('button.finish'),
              defaultMessage: 'Finish',
            })}
          </Button>
        }
      />
    </>
  )
}

export default DetailImport