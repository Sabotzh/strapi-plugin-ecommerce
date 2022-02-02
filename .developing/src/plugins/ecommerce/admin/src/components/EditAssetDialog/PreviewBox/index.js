import React, { useState, useRef } from 'react';

import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Stack } from '@strapi/design-system/Stack';
import { Box } from '@strapi/design-system/Box';
import { IconButton } from '@strapi/design-system/IconButton';
import Trash from '@strapi/icons/Trash';
import LinkIcon from '@strapi/icons/Link';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { prefixFileUrlWithBackendUrl, useNotification } from '@strapi/helper-plugin';

import getTrad from '../../../utils/getTrad';
import {
  ActionRow,
  Wrapper,
  BadgeOverride,
} from './components';

export const PreviewBox = ({
  asset,
  onDeleteAsset,
  canCopyLink
}) => {
  const { width, height } = asset
  const { formatMessage } = useIntl();
  const toggleNotification = useNotification();

  return (
    <>
      <Box style={{ position: 'relative' }} hasRadius background={"neutral150"} borderColor="neutral200">
        <ActionRow paddingLeft={3} paddingRight={3} justifyContent="flex-end">
          <Stack size={1} horizontal>
            {onDeleteAsset && (
              <IconButton
                label={formatMessage({
                  id: getTrad('app.utils.delete'),
                  defaultMessage: 'Delete',
                })}
                icon={<Trash/>}
                onClick={() => onDeleteAsset()}
              />
            )}

            { canCopyLink && (
              <CopyToClipboard
                text={prefixFileUrlWithBackendUrl(asset.url)}
                onCopy={() => {
                  toggleNotification({
                    type: 'success',
                    message: {
                      id: 'notification.link-copied',
                      defaultMessage: 'Link copied into the clipboard',
                    },
                  });
                }}
              >
                <IconButton
                  label={formatMessage({
                    id: getTrad('control-card.copy-link'),
                    defaultMessage: 'Copy link',
                  })}
                  icon={<LinkIcon/>}
                />
              </CopyToClipboard>)
            }
          </Stack>
        </ActionRow>

        <Wrapper>
          <Box
            as="img"
            maxHeight="100%"
            maxWidth="auto"
            src={asset.url}
            alt={asset.alternativeText || asset.name}
          />
        </Wrapper>

        <ActionRow
          paddingLeft={2}
          paddingRight={2}
          justifyContent="flex-end"
        >
          { width && height && (
            <BadgeOverride background={"neutral900"} color="neutral0">
              {width && height ? `${height}✕${width}` : 'N/A'}
            </BadgeOverride>
          )}
        </ActionRow>
      </Box>
    </>
  );
};

PreviewBox.defaultProps = {
  replacementFile: undefined,
  trackedLocation: undefined,
  canCopyLink: true
};

PreviewBox.propTypes = {
  replacementFile: PropTypes.instanceOf(File),
  asset: PropTypes.func.isRequired,
  onDeleteAsset: PropTypes.func.isRequired,
  canCopyLink: PropTypes.bool
};
