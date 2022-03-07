import React from 'react';
import styled from 'styled-components';
import getTrad from '../../utils/getTrad';

import { useIntl } from 'react-intl';
import { Typography } from '@strapi/design-system/Typography';
import { Button } from '@strapi/design-system/Button';
import { Flex } from '@strapi/design-system/Flex';
import { Box } from '@strapi/design-system/Box';
import { Stack } from '@strapi/design-system/Stack';
import { Grid, GridItem } from '@strapi/design-system/Grid';
import { pxToRem } from '@strapi/helper-plugin';
import File from '@strapi/icons/File';
import { ModalBody, ModalHeader, ModalFooter } from '@strapi/design-system/ModalLayout';
import {
  Card,
  CardBody,
  CardContent,
  CardHeader,
  CardTitle,
  CardSubtitle,
  CardBadge,
} from '@strapi/design-system/Card';


const Extension = styled.span`
  text-transform: uppercase;
`;

const CardAsset = styled(Flex)`
  border-radius: ${({ theme }) => theme.borderRadius} ${({ theme }) => theme.borderRadius} 0 0;
  background: linear-gradient(180deg, #ffffff 0%, #f6f6f9 121.48%);
`;

const IconWrapper = styled.span`
  svg {
    font-size: 3rem;
  }
`;


const DetailImport = ({ onClose, file }) => {
  const { formatMessage } = useIntl();

  return (
    <>
      <ModalHeader>
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
          Detail
        </Typography>
      </ModalHeader>
      <ModalBody>
        <Grid gap={4}>
          <GridItem col={6}>
            <Card>
              <CardHeader>
                <CardAsset
                  width="100%"
                  height={pxToRem(164)}
                  justifyContent="center"
                >
                  <IconWrapper>
                    <File/>
                  </IconWrapper>
                </CardAsset>
              </CardHeader>
              <CardBody>
                <CardContent>
                  <CardTitle as="h2">{ file.name.replace(/\.[^/.]+$/, '') }</CardTitle>
                  <CardSubtitle>
                    <Extension>{ file.ext }</Extension>
                  </CardSubtitle>
                </CardContent>
                <CardBadge>DOC</CardBadge>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem col={6}>
            <Stack size={4} background={'neutral100'} padding={3}>
              <Box>
                <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
                  Statistic
                </Typography>
              </Box>
              <Box>
                Products: { 10 }pc
              </Box>
              <Box>
                Categories: { 10 }pc
              </Box>
              <Box>
                Manufacturer: { 10 }pc
              </Box>
              <Box>
                Some statistic...
              </Box>
            </Stack>

          </GridItem>
        </Grid>
      </ModalBody>
      <ModalFooter
        startActions={
          <Button onClick={onClose} variant="tertiary">
            {formatMessage({ id: 'app.components.Button.cancel', defaultMessage: 'cancel' })}
          </Button>
        }
        endActions={
          <Button>
            {formatMessage({
              id: getTrad('button.finish'),
              defaultMessage: 'Finish',
            })}
          </Button>
        }
      />
    </>
  )
}

export default DetailImport