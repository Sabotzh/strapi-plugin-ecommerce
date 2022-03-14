import React, { useState } from 'react';
import { urlSchema } from '../../../utils/urlYupSchema';

import getTrad from '../../../utils/getTrad';
import { urlsToAssets } from '../../../utils/urlsToAssets';

import { ModalFooter, ModalBody } from '@strapi/design-system/ModalLayout';
import { Textarea } from '@strapi/design-system/Textarea';
import { useIntl } from 'react-intl';
import { Button } from '@strapi/design-system/Button';
import { Form } from '@strapi/helper-plugin';
import { Formik } from 'formik';


export const FromUrlForm = ({ onClose, onAddAsset }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const { formatMessage } = useIntl();

  const handleSubmit = async ({ urls }) => {
    setLoading(true);
    const urlArray = urls.split(/\r?\n/);
    try {
      const assets = await urlsToAssets(urlArray);

      onAddAsset(assets);
      setLoading(false)
    } catch (e) {
      setError(e);
      setLoading(false);
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        urls: '',
      }}
      onSubmit={handleSubmit}
      validationSchema={urlSchema}
      validateOnChange={false}
    >
      {({ values, errors, handleChange }) => (
        <Form noValidate>
          <ModalBody>
            <Textarea
              label={formatMessage({ id: getTrad('input.url.label'), defaultMessage: 'URL' })}
              name="urls"
              hint={formatMessage({
                id: getTrad('input.url.description'),
                defaultMessage: 'Separate your URL links by a carriage return.',
              })}
              error={
                error?.message ||
                (errors.urls
                  ? formatMessage({ id: errors.urls, defaultMessage: 'An error occured' })
                  : undefined)
              }
              onChange={handleChange}
            >
              {values.urls}
            </Textarea>
          </ModalBody>

          <ModalFooter
            startActions={
              <Button onClick={onClose} variant="tertiary">
                {formatMessage({ id: 'app.components.Button.cancel', defaultMessage: 'cancel' })}
              </Button>
            }
            endActions={
              <Button type="submit" loading={loading}>
                {formatMessage({
                  id: getTrad('button.next'),
                  defaultMessage: 'Next',
                })}
              </Button>
            }
          />
        </Form>
      )}
    </Formik>
  );
};

FromUrlForm.defaultProps = {
  trackedLocation: undefined,
};
