import React from 'react';

import getTrad from '../../../utils/getTrad';
import { FromUrlForm } from './FromUrlForm';
import { FromComputerForm } from './FromComputerForm';

import { ModalHeader } from '@strapi/design-system/ModalLayout';
import { Typography } from '@strapi/design-system/Typography';
import { Divider } from '@strapi/design-system/Divider';
import { Box } from '@strapi/design-system/Box';
import { useIntl } from 'react-intl';
import { Tabs, Tab, TabGroup, TabPanels, TabPanel } from '@strapi/design-system/Tabs';


export const AddAssetStep = ({ onClose, onAddAsset }) => {
  const { formatMessage } = useIntl();

  return (
    <>
      <ModalHeader>
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
          {formatMessage({
            id: getTrad('header.actions.upload-assets'),
            defaultMessage: 'Upload assets',
          })}
        </Typography>
      </ModalHeader>

      <TabGroup
        label={formatMessage({
          id: getTrad('tabs.title'),
          defaultMessage: 'How do you want to upload your assets?',
        })}
        variant="simple"
      >
        <Box paddingLeft={8} paddingRight={8} paddingTop={6}>
          <Tabs>
            <Tab>
              {formatMessage({
                id: getTrad('modal.nav.computer'),
                defaultMessage: 'From computer',
              })}
            </Tab>
            <Tab>
              {formatMessage({
                id: getTrad('modal.nav.url'),
                defaultMessage: 'From URL',
              })}
            </Tab>
          </Tabs>

          <Divider />
        </Box>
        <TabPanels>
          <TabPanel>
            <FromComputerForm
              onClose={onClose}
              onAddAssets={onAddAsset}
            />
          </TabPanel>
          <TabPanel>
            <FromUrlForm
              onClose={onClose}
              onAddAsset={onAddAsset}
            />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </>
  );
};