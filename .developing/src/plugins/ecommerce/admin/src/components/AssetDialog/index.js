import React, { useState } from 'react';
import { ModalLayout, ModalBody } from '@strapi/design-system/ModalLayout';
import { Flex } from '@strapi/design-system/Flex';
import { Box } from '@strapi/design-system/Box';
import { useIntl } from 'react-intl';
import { Button } from '@strapi/design-system/Button';
import { Divider } from '@strapi/design-system/Divider';
import { Badge } from '@strapi/design-system/Badge';
import { Loader } from '@strapi/design-system/Loader';
import { useSelectionState, AnErrorOccurred } from '@strapi/helper-plugin';
import getTrad from '../../utils/getTrad';
import { DialogTitle } from './DialogTitle';
import { DialogFooter } from './DialogFooter';
import { ImageList } from './ImageList';
import { Tabs, Tab, TabGroup, TabPanels, TabPanel } from '@strapi/design-system/Tabs';

const AssetDialog = ({
  onClose,
  initiallySelectedAssets,
  size,
  onFinish,
  uploadOpen,
  loading,
  assets,
  deleteAsset,
  error,
  onEdit,
}) => {
  const { formatMessage } = useIntl();
  const [selectedAssets, { selectOnly }] = useSelectionState(
    'id',
    initiallySelectedAssets
  );

  const [initialSelectedTabIndex, setInitialSelectedTabIndex] = useState(
    selectedAssets.length > 0 ? 1 : 0
  );

  const handleSelectAsset = asset => {
    selectOnly(asset)
  };

  if (loading && !error) {
    return (
      <ModalLayout onClose={onClose} labelledBy="asset-dialog-title" aria-busy>
        <DialogTitle />
        <Flex justifyContent="center" paddingTop={4} paddingBottom={4}>
          <Loader>
            {formatMessage({
              id: getTrad('list.asset.load'),
              defaultMessage: 'How do you want to upload your assets?',
            })}
          </Loader>
        </Flex>
        <DialogFooter onClose={onClose} />
      </ModalLayout>
    );
  }

  if (error) {
    return (
      <ModalLayout onClose={onClose} labelledBy="asset-dialog-title">
        <DialogTitle />
        <AnErrorOccurred />
        <DialogFooter onClose={onClose} />
      </ModalLayout>
    );
  }

  return (
    <ModalLayout onClose={onClose} labelledBy="asset-dialog-title">
      <DialogTitle />

      <TabGroup
        label={formatMessage({
          id: getTrad('tabs.title'),
          defaultMessage: 'How do you want to upload your assets?',
        })}
        variant="simple"
        initialSelectedTabIndex={initialSelectedTabIndex}
        onTabChange={() => setInitialSelectedTabIndex(0)}
      >
        <Flex paddingLeft={8} paddingRight={8} paddingTop={6} justifyContent="space-between">
          <Tabs>
            <Tab>
              {formatMessage({
                id: getTrad('modal.nav.browse'),
                defaultMessage: 'Browse',
              })}
            </Tab>
            <Tab>
              {formatMessage({
                id: getTrad('modal.header.select-files'),
                defaultMessage: 'Selected files',
              })}
              <Badge marginLeft={2}>{selectedAssets.length}</Badge>
            </Tab>
          </Tabs>

          <Button onClick={uploadOpen}>
            {formatMessage({
              id: getTrad('modal.upload-list.sub-header.button'),
              defaultMessage: 'Add more assets',
            })}
          </Button>
        </Flex>
        <Divider />
        <TabPanels>
          <TabPanel>
            <ModalBody>
              <Box paddingTop={3}>
                <ImageList
                  assets={assets}
                  selectedAssets={selectedAssets}
                  onSelectAsset={handleSelectAsset}
                  onDeleteAsset={deleteAsset}
                  onEditAsset={onEdit}
                />
              </Box>
            </ModalBody>
          </TabPanel>
          <TabPanel>
            <ModalBody>
              <ImageList
                allowedTypes
                assets={selectedAssets}
                selectedAssets={selectedAssets}
                onSelectAsset={handleSelectAsset}
                size={size}
              />
            </ModalBody>
          </TabPanel>
        </TabPanels>
      </TabGroup>
      <DialogFooter onClose={onClose} onFinish={() => {
        onClose()
        onFinish(selectedAssets)
      }}/>
    </ModalLayout>
  );
}

export default AssetDialog

AssetDialog.defaultProps = {
  allowedTypes: [],
  initiallySelectedAssets: [],
  size: 'S',
  assets: [],
  loading: false,
  error: false
};
