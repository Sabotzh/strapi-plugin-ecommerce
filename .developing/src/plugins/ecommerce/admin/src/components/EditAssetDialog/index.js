import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { TextInput } from '@strapi/design-system/TextInput';
import { getFileExtension, Form, request } from '@strapi/helper-plugin';
import { Stack } from '@strapi/design-system/Stack';
import { ModalLayout, ModalBody, ModalHeader, ModalFooter } from '@strapi/design-system/ModalLayout';
import { Typography } from "@strapi/design-system/Typography";
import { Grid, GridItem } from '@strapi/design-system/Grid';
import { Button } from '@strapi/design-system/Button';
import { PreviewBox } from "./PreviewBox";
import { AssetMeta } from "./AssetMeta";
import getTrad from "../../utils/getTrad";
import validateCategories from "../../utils/validate";
import formatBytes from "../../utils/formatBytes";

export const EditAssetDialog = ({ asset, onClose, onDeleteAsset }) => {
  const [ name, setName ] = useState(asset.name)
  const [ alt, setAlt ] = useState(asset.alternativeText)
  const [ caption, setCaption ] = useState(asset.caption)
  const [ errors, setErrors ] = useState({})
  const { formatMessage, formatDate } = useIntl();

  const onFinish = () => {
    let { success, validateErrors } = validateCategories(
      { name, alt, caption }, errors, setErrors
    );

    const updateImage = async(data) => {
      console.log('UPDATED')
      // await request(`/upload/files?id=${asset.id}`,{
      //   method: 'POST',
      //   body: data
      // })
    }

    if (success) {
      const formData = new FormData();

      formData.append('fileInfo', JSON.stringify({
        alternativeText: asset.alternativeText,
        caption: asset.caption,
        name: asset.name,
      }));

      updateImage(formData);
    } else {
      setErrors(validateErrors);
    }
  }

  return (
    <ModalLayout onClose={onClose} labelledBy="title">
      <ModalHeader>
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
          {formatMessage({ id: getTrad('modal.edit.title'), defaultMessage: 'Details' })}
        </Typography>
      </ModalHeader>
      <ModalBody>
        <Grid gap={4}>
          <GridItem xs={12} col={6}>
            <PreviewBox
              asset={asset}
              onDeleteAsset={onDeleteAsset}
              // replacementFile={replacementFile}
            />
          </GridItem>
          <GridItem xs={12} col={6}>
              <Stack size={3}>
                <AssetMeta
                  size={formatBytes(asset.size)}
                  dimension={
                    asset.height && asset.width ? `${asset.height}✕${asset.width}` : ''
                  }
                  date={formatDate(new Date(asset.createdAt))}
                  extension={getFileExtension(asset.ext)}
                />

                <TextInput
                  size="S"
                  label={formatMessage({
                    id: getTrad('form.input.label.file-name'),
                    defaultMessage: 'File name',
                  })}
                  name="name"
                  error={ errors.name }
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <TextInput
                  size="S"
                  label={formatMessage({
                    id: getTrad('form.input.label.file-alt'),
                    defaultMessage: 'Alternative text',
                  })}
                  name="alternativeText"
                  hint={formatMessage({
                    id: getTrad({ id: getTrad('form.input.decription.file-alt') }),
                    defaultMessage: 'This text will be displayed if the asset can’t be shown.',
                  })}
                  value={alt}
                  error={ errors.alt }
                  onChange={(e) => setAlt(e.target.value)}
                />

                <TextInput
                  size="S"
                  label={formatMessage({
                    id: getTrad('form.input.label.file-caption'),
                    defaultMessage: 'Caption',
                  })}
                  name="caption"
                  value={caption}
                  error={errors.caption}
                  onChange={(e) => setCaption(e.target.value)}
                />
              </Stack>
          </GridItem>
        </Grid>
      </ModalBody>
      <ModalFooter
        startActions={
          <Button onClick={onClose} variant="tertiary">
            {formatMessage({ id: 'cancel', defaultMessage: 'Cancel' })}
          </Button>
        }
        endActions={
          <>
            {/*<ReplaceMediaButton*/}
            {/*  onSelectMedia={setReplacementFile}*/}
            {/*  acceptedMime={asset.mime}*/}
            {/*  disabled={formDisabled}*/}
            {/*  trackedLocation={trackedLocation}*/}
            {/*/>*/}

            <Button
              onClick={onFinish}
            >
              {formatMessage({ id: 'form.button.finish', defaultMessage: 'Finish' })}
            </Button>
          </>
        }
      />
    </ModalLayout>
  )
}
