import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useIntl } from 'react-intl';
import { Icon } from '@strapi/design-system/Icon';
import { Flex } from '@strapi/design-system/Flex';
import { Typography } from '@strapi/design-system/Typography';
import PicturePlusIcon from '@strapi/icons/PicturePlus';
import getTrad from '../../utils/getTrad';
import { rawFileToAsset } from '../../utils/rawFileToAsset';
import AssetDialog from '../AssetDialog'
import { Box } from '@strapi/design-system/Box';
import {
  Card,
  CardHeader,
  CardBody,
  CardCheckbox,
  CardAction,
  CardAsset,
  CardTimer,
  CardContent,
  CardBadge,
  CardTitle,
  CardSubtitle,
} from '@strapi/design-system/Card';

const TextAlignTypography = styled(Typography)`
  align-items: center;
`;

const InputImage = ({ disabled, onDropAsset, onFinish, selectedAsset }) => {
  const [ visible, setVisible ] = useState(false)
  const { formatMessage } = useIntl();
  const [dragOver, setDragOver] = useState(false);

  const handleDragEnter = () => setDragOver(true);
  const handleDragLeave = e => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragOver(false);
    }
  };

  const handleDrop = e => {
    if (e?.dataTransfer?.files) {
      const files = e.dataTransfer.files;
      const assets = [];

      for (let i = 0; i < files.length; i++) {
        const file = files.item(i);
        const asset = rawFileToAsset(file, 'computer');

        assets.push(asset);
      }

      onDropAsset(assets);
    }

    setDragOver(false);
  };
  console.log(selectedAsset)

  return (
    <Flex
      borderStyle={dragOver ? 'dashed' : 'solid'}
      borderWidth= '1px'
      borderColor={dragOver ? 'primary600' : 'neutral400'}
      borderRadius="4px"
      style={{ height: '9rem' }}
      background={"neutral100"}
      padding={2}
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      {
        !selectedAsset ?
          <Flex
            direction="column"
            justifyContent="center"
            alignItems="center"
            height="100%"
            width="100%"
            as="button"
            type="button"
            disabled={disabled}
            onClick={() => setVisible(true)}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{ cursor: disabled ? 'not-allowed' : 'pointer', height: '8rem' }}
          >
            {
              visible &&
              <AssetDialog onClose={() => setVisible(false)} onFinish={onFinish}/>
            }
            <Icon
              as={PicturePlusIcon}
              aria-hidden
              width="30px"
              height="24px"
              color={disabled ? 'neutral400' : 'primary600'}
              marginBottom={3}
            />
            <TextAlignTypography
              variant="pi"
              fontWeight="bold"
              textColor="neutral600"
              style={{ textAlign: 'center' }}
              as="span"
            >
              { formatMessage({
                id: getTrad('mediaLibraryInput.placeholder'),
                defaultMessage: 'Click to select an asset or drag and drop one in this area',
              })}
            </TextAlignTypography>
          </Flex>
          :
          <Box
            onClick={() => setVisible(true)}
            as="img"
            maxHeight="100%"
            maxWidth="auto"
            src={selectedAsset.url}
            alt={selectedAsset.alternativeText || selectedAsset.name}
          />
      }
    </Flex>
  );
};

export default InputImage

InputImage.defaultProps = {
  disabled: false,
  onDropAsset: undefined,
  selectedAsset: undefined,
};

InputImage.propTypes = {
  disabled: PropTypes.bool,
  onDropAsset: PropTypes.func,
  onFinish: PropTypes.func.require,
  selectedAsset: PropTypes.object,
};
