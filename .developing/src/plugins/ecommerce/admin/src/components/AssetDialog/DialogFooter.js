import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@strapi/design-system/Button';
import { ModalFooter } from '@strapi/design-system/ModalLayout';
import { useIntl } from 'react-intl';

export const DialogFooter = ({ onClose, onFinish }) => {
  const { formatMessage } = useIntl();

  return (
    <ModalFooter
      startActions={
        <Button onClick={onClose} variant="tertiary">
          {formatMessage({ id: 'app.components.Button.cancel', defaultMessage: 'Cancel' })}
        </Button>
      }
      endActions={
        onFinish &&
          <>
            <Button onClick={onFinish}>
              {formatMessage({ id: 'form.button.finish', defaultMessage: 'Finish' })}
            </Button>
          </>
      }
    />
  );
};

DialogFooter.defaultProps = {
  onFinish: undefined,
}

DialogFooter.propTypes = {
  onClose: PropTypes.func.isRequired,
  onFinish: PropTypes.func,
};
