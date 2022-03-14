import React from 'react';
import styled from 'styled-components';

import { Flex } from '@strapi/design-system/Flex';
import { Typography } from '@strapi/design-system/Typography';
import { Box } from '@strapi/design-system/Box';
import { IconButton } from '@strapi/design-system/IconButton';
import Cross from '@strapi/icons/Cross';

const IconWrapper = styled.div`
  font-size: ${60 / 10}rem;

  svg path, svg circle {
    fill: ${({ theme }) => theme.colors.primary600};
  }
`;

const Wrapper = styled(Flex)`
  flex-direction: column;
  align-self: center;
`;

const Card = styled(Box)`
  position: relative;
  display: flex;
  justify-content: center;
  border-style: dashed;
  width: 100%;
  height: 320px;
`;

const ButtonCancel = styled(IconButton)`
  position: absolute;
  top: 10px;
  right: 10px;
`

const AssetCard = ({ title, image }) => {
  return (
    <Card
      hasRadius
      borderColor={'neutral300'}
      background={'neutral100'}
    >
      <ButtonCancel icon={<Cross/>} />
      <Wrapper>
        <IconWrapper>
          { image }
        </IconWrapper>
        <Typography textColor={'neutral600'} variant={'alpha'}>{ title }</Typography>
      </Wrapper>
    </Card>
  )
}

export default AssetCard