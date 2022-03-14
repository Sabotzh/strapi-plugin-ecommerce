/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import getTrad from '../../../utils/getTrad';
import { rawFileToAsset } from '../../../utils/rawFileToAsset';

import { Box } from '@strapi/design-system/Box';
import { Flex } from '@strapi/design-system/Flex';
import { Typography } from '@strapi/design-system/Typography';
import { useTracking } from '@strapi/helper-plugin';
import { Button } from '@strapi/design-system/Button';
import PicturePlus from '@strapi/icons/PicturePlus';
import { useIntl } from 'react-intl';


const Wrapper = styled(Flex)`
  flex-direction: column;
`;

const IconWrapper = styled.div`
  font-size: ${60 / 10}rem;

  svg path, svg circle {
    fill: ${({ theme, color }) => {
      return color ? theme.colors[color] : theme.colors.primary600
    }};
  }
`;

const MediaBox = styled(Box)`
  border-style: dashed;
`;

const OpaqueBox = styled(Box)`
  opacity: 0;
  cursor: pointer;
`;

export const FromComputerForm = ({ onAddAssets, trackedLocation, onlyOne, picture, title, color }) => {
  const { formatMessage } = useIntl();
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);
  const { trackUsage } = useTracking();

  const handleDragEnter = () => setDragOver(true);
  const handleDragLeave = () => setDragOver(false);

  const handleClick = e => {
    e.preventDefault();
    inputRef.current.click();
  };

  const handleChange = () => {
    const files = inputRef.current.files;
    const assets = [];

    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      const asset = rawFileToAsset(file, 'computer');

      assets.push(asset);
    }

    if (trackedLocation) {
      trackUsage('didSelectFile', { source: 'computer', location: trackedLocation });
    }

    onAddAssets(assets);
  };

  return (
    <form>
      <Box>
        <label>
          <MediaBox
            paddingTop={11}
            paddingBottom={11}
            hasRadius
            justifyContent="center"
            borderColor={dragOver ? 'primary500' : 'neutral300'}
            background={dragOver ? 'primary100' : 'neutral100'}
            position="relative"
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
          >
            <Flex justifyContent="center">
              <Wrapper>
                <IconWrapper color={color}>
                  { picture || <PicturePlus aria-hidden/> }
                </IconWrapper>

                <Box paddingTop={3} paddingBottom={5}>
                  <Typography variant="delta" textColor="neutral600" as="span">
                    {
                      title || formatMessage({
                        id: getTrad('input.label'),
                        defaultMessage: 'Drag & Drop here or',
                      })
                    }
                  </Typography>
                </Box>

                <OpaqueBox
                  as="input"
                  position="absolute"
                  left={0}
                  right={0}
                  bottom={0}
                  top={0}
                  width="100%"
                  type="file"
                  multiple = { !onlyOne }
                  name="files"
                  tabIndex={-1}
                  ref={inputRef}
                  zIndex={1}
                  onChange={handleChange}
                />

                <Box position="relative">
                  <Button type="button" onClick={handleClick}>
                    {formatMessage({
                      id: getTrad('input.button.label'),
                      defaultMessage: 'Browse files',
                    })}
                  </Button>
                </Box>
              </Wrapper>
            </Flex>
          </MediaBox>
        </label>
      </Box>
    </form>
  );
};

FromComputerForm.defaultProps = {
  trackedLocation: undefined,
};