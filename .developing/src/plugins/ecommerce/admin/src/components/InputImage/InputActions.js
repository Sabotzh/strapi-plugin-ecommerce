import React from 'react'
import getTrad from "../../utils/getTrad";

import { useIntl } from 'react-intl';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import PlusIcon from '@strapi/icons/Plus';
import TrashIcon from '@strapi/icons/Trash';
import PencilIcon from '@strapi/icons/Pencil';
import LinkIcon from '@strapi/icons/Link';
import { Flex } from '@strapi/design-system/Flex';
import { Stack } from '@strapi/design-system/Stack';
import { IconButton } from '@strapi/design-system/IconButton';
import { prefixFileUrlWithBackendUrl, useNotification } from '@strapi/helper-plugin';


export const InputActions = ({ asset, onAddAsset, onDeleteAsset, onEditAsset }) => {
  const { formatMessage } = useIntl();
  const toggleNotification = useNotification();

  return  (
    <Flex
      direction="row"
      justifyContent="center"
      alignItems="center"
      width={'100%'}
      style={{ position: 'absolute', bottom: '7.5px' }}
    >
      <Stack horizontal size={1}>
      <IconButton
        label={formatMessage({
          id: getTrad('control-card.add'),
          defaultMessage: 'Add',
        })}
        icon={<PlusIcon />}
        onClick={() => onAddAsset(asset)}
      />

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
          icon={<LinkIcon />}
        />
      </CopyToClipboard>

      <IconButton
        label={formatMessage({
          id: getTrad('app.utils.delete'),
          defaultMessage: 'Delete',
        })}
        icon={<TrashIcon />}
        onClick={() => onDeleteAsset()}
      />

      <IconButton
        label={formatMessage({
          id: getTrad('app.utils.edit'),
          defaultMessage: 'edit',
        })}
        icon={<PencilIcon />}
        onClick={onEditAsset}
      />
      </Stack>
    </Flex>
  )
};