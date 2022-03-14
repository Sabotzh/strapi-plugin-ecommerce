import React from 'react';
import styled from 'styled-components';

import File from '@strapi/icons/File';
import { Flex } from '@strapi/design-system/Flex';
import { Typography } from '@strapi/design-system/Typography';
import { Box } from '@strapi/design-system/Box';

const IconWrapper = styled.div`
  font-size: ${60 / 8}rem;

  svg path, svg circle {
    fill: ${({ theme }) => theme.colors.primary600};
  }
`;

const Wrapper = styled(Flex)`
  flex-direction: column;
`;

const Card = styled(Box)`
  display: flex;
  justify-content: center;
  align-content: center;
  border-style: dashed;
  width: 100%;
  height: 280px;
`;

const AssetCard = ({ title, image }) => {
  return (
    <Card
      hasRadius
      borderColor={'neutral300'}
      background={'neutral100'}
      position='relative'
      width={'100%'}
    >
      <Flex justifyContent="center">
        <Wrapper>
          <IconWrapper>
            { image }
          </IconWrapper>
          <Typography textColor={'neutral600'} variant={'alpha'}>{ title }</Typography>
        </Wrapper>
      </Flex>
    </Card>
  )
}

export default AssetCard