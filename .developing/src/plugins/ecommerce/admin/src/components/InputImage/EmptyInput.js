import React from 'react'
import styled from "styled-components";
import PropTypes from 'prop-types';

import { Flex } from '@strapi/design-system/Flex';
import { useIntl } from 'react-intl';
import { Icon } from '@strapi/design-system/Icon';
import { Typography } from '@strapi/design-system/Typography';
import PicturePlusIcon from '@strapi/icons/PicturePlus';

import getTrad from "../../utils/getTrad";

const TextAlignTypography = styled(Typography)`
  align-items: center;
`;

export const EmptyInput = ({ onClick }) => {
  const { formatMessage } = useIntl();

  return <Flex
    direction="column"
    justifyContent="center"
    alignItems="center"
    height="100%"
    width="100%"
    as="button"
    type="button"
    onClick={() => onClick()}
    style={{ cursor: 'pointer' }}
  >
    <Icon
      as={PicturePlusIcon}
      aria-hidden
      width="30px"
      height="24px"
      color={'primary600'}
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
}

EmptyInput.propTypes = {
  onFinish: PropTypes.func.require,
};