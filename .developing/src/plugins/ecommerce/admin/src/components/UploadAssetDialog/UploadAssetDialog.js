import React, { useState } from 'react';

import { AddAssetStep } from './AddAssetStep/AddAssetStep';
import { PendingAssetStep } from './PendingAssetStep/PendingAssetStep';
import { EditAssetDialog } from '../EditAssetDialog';

import { ModalLayout } from '@strapi/design-system/ModalLayout';
import { useIntl } from 'react-intl';

const Steps = {
  AddAsset: 'AddAsset',
  PendingAsset: 'PendingAsset',
};

export const UploadAssetDialog = ({
  initialAssetsToAdd,
  onClose,
  addUploadedFiles,
  updateAssets
}) => {
  const { formatMessage } = useIntl();
  const [step, setStep] = useState(initialAssetsToAdd ? Steps.PendingAsset : Steps.AddAsset);
  const [assets, setAssets] = useState(initialAssetsToAdd || []);
  const [assetToEdit, setAssetToEdit] = useState(undefined);


  const handleAddToPendingAssets = nextAssets => {
    setAssets(prevAssets => prevAssets.concat(nextAssets));
    setStep(Steps.PendingAsset);
  };

  const moveToAddAsset = () => {
    setStep(Steps.AddAsset);
  };

  const handleCancelUpload = file => {
    const nextAssets = assets.filter(asset => asset.rawFile !== file);
    setAssets(nextAssets);

    // When there's no asset, transition to the AddAsset step
    if (nextAssets.length === 0) {
      moveToAddAsset();
    }
  };

  const handleUploadSuccess = file => {
    const nextAssets = assets.filter(asset => asset.rawFile !== file);
    setAssets(nextAssets);

    if (nextAssets.length === 0) {
      updateAssets();
      onClose();
    }
  };

  const handleAssetEditValidation = nextAsset => {
    if (nextAsset) {
      const nextAssets = assets.map(asset => (asset === assetToEdit ? nextAsset : asset));
      setAssets(nextAssets);
    }

    setAssetToEdit(undefined);
  };

  const handleAssetDelete = nextAsset => {
    if (nextAsset) {
      const nextAssets = assets.filter(asset => (asset.url !== nextAsset.url));
      setAssets(nextAssets);
    }
  }

  const handleClose = () => {
    if (step === Steps.PendingAsset && assets.length > 0) {
      // eslint-disable-next-line no-alert
      const confirm = window.confirm(
        formatMessage({
          id: 'window.confirm.close-modal.files',
          defaultMessage: 'Are you sure? You have some files that have not been uploaded yet.',
        })
      );

      if (confirm) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  return (
    <ModalLayout onClose={handleClose} labelledBy="title">
      {step === Steps.AddAsset && (
        <AddAssetStep
          onClose={onClose}
          onAddAsset={handleAddToPendingAssets}
        />
      )}

      {step === Steps.PendingAsset && (
        <PendingAssetStep
          onClose={handleClose}
          assets={assets}
          onEditAsset={setAssetToEdit}
          onClickAddAsset={moveToAddAsset}
          onCancelUpload={handleCancelUpload}
          onUploadSucceed={handleUploadSuccess}
          initialAssetsToAdd={initialAssetsToAdd}
          addUploadedFiles={addUploadedFiles}
        />
      )}

      {assetToEdit && (
        <EditAssetDialog
          onClose={() => handleAssetEditValidation()}
          asset={assetToEdit}
          onDeleteAsset={() => {
            setAssetToEdit(undefined)
            handleAssetDelete(assetToEdit)
          }}
          canCopyLink={false}
        />
      )}
    </ModalLayout>
  );
};

UploadAssetDialog.defaultProps = {
  addUploadedFiles: undefined,
  initialAssetsToAdd: undefined,
};