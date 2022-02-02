import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Card,
  CardBody,
  CardContent,
  CardHeader,
  CardTitle,
  CardSubtitle,
  CardBadge,
} from '@strapi/design-system/Card';
import { Typography } from '@strapi/design-system/Typography';
import { Stack } from '@strapi/design-system/Stack';
import { useIntl } from 'react-intl';
import getTrad from "../../utils/getTrad";
import { useUpload } from '../../hooks/useUpload';
import { UploadProgress } from '../UploadProgress';

const UploadProgressWrapper = styled.div`
  height: ${88 / 16}rem;
  width: 100%;
`;

const Extension = styled.span`
  text-transform: uppercase;
`;

export const UploadingAssetCard = ({ asset, onCancel, onStatusChange, addUploadedFiles }) => {
  const { upload, cancel, error, progress, status } = useUpload(asset);
  const { formatMessage } = useIntl();

  let badgeContent;

  if (asset.type === 'image') {
    badgeContent = formatMessage({
      id: getTrad('settings.section.image.label'),
      defaultMessage: 'Image',
    });
  }

  useEffect(() => {
    const uploadFile = async () => {
      const files = await upload(asset);

      if (addUploadedFiles) {
        addUploadedFiles(files);
      }
    };

    uploadFile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onStatusChange(status);
  }, [status, onStatusChange]);

  const handleCancel = () => {
    cancel();
    onCancel(asset.rawFile);
  };

  return (
    <Stack size={1}>
      <Card borderColor={error ? 'danger600' : undefined}>
        <CardHeader>
          <UploadProgressWrapper>
            <UploadProgress error={error} onCancel={handleCancel} progress={progress} />
          </UploadProgressWrapper>
        </CardHeader>
        <CardBody>
          <CardContent>
            <CardTitle as="h2">{asset.name}</CardTitle>
            <CardSubtitle>
              <Extension>{asset.ext}</Extension>
            </CardSubtitle>
          </CardContent>
          <CardBadge>{badgeContent}</CardBadge>
        </CardBody>
      </Card>
      {error ? (
        <Typography variant="pi" fontWeight="bold" textColor="danger600">
          {error.message}
        </Typography>
      ) : undefined}
    </Stack>
  );
};

UploadingAssetCard.defaultProps = {
  addUploadedFiles: undefined,
};

UploadingAssetCard.propTypes = {
  addUploadedFiles: PropTypes.func,
  asset: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired,
};
