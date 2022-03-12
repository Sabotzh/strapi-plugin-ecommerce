import React from 'react';
import File from '@strapi/icons/File';
import { Flex } from '@strapi/design-system/Flex';
import { Box } from '@strapi/design-system/Box';
import styled from 'styled-components';
import getTrad from "../../utils/getTrad";

const IconWrapper = styled.div`
  font-size: ${60 / 8}rem;

  svg path {
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

const AssetCard = () => {
  return (
    <Card
      hasRadius
      borderColor={'neutral300'}
      background={'neutral100'}
      position="relative"
      width={'100%'}
    >
      <Flex justifyContent="center">
        <Wrapper>
          <IconWrapper>
            <File/>
          </IconWrapper>
        </Wrapper>
      </Flex>
    </Card>
  )
}

export default AssetCard