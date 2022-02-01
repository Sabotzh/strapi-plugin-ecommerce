import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ModalLayout } from '@strapi/design-system/ModalLayout';
import { Flex } from '@strapi/design-system/Flex';
import { Box } from '@strapi/design-system/Box';
import { useIntl } from 'react-intl';
import { Loader } from '@strapi/design-system/Loader';
import { useSelectionState, request, AnErrorOccurred } from '@strapi/helper-plugin';
import getTrad from '../../utils/getTrad';
import { DialogTitle } from './DialogTitle';
import { DialogFooter } from './DialogFooter';
import { ImageList } from './ImageList';
import { ext } from '../../utils/getExt'

const AssetDialog = ({
  onClose,
  initiallySelectedAssets,
  size,
  onFinish
}) => {
  const [ loading, setLoading ] = useState(true)
  const [ error, setError ] = useState(false)
  const { formatMessage } = useIntl();
  const [ data, setData ] = useState([])

  const getData = async () => {
    const qs = require('qs');
    const query = qs.stringify(
      { filters: { ext: { $in: ext }}},
      { encodeValuesOnly: true }
    );

    await request(`/upload/files?${query}`)
      .then((res) => {
        setData(res.results)
        setLoading(false)
      })
      .catch(() => setError(true));
  }

  //const returnedImageData =

  useEffect(() => {
    getData().then()
  }, [])

  if (data.length > 0) {
    initiallySelectedAssets = [data[0]];
  }

  const [selectedAssets, { selectOnly }] = useSelectionState(
    'id',
    initiallySelectedAssets
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
      <Box paddingLeft={8} paddingRight={8} paddingBottom={6} paddingTop={6}>
        <ImageList
          allowedTypes
          assets={data}
          selectedAssets={selectedAssets}
          onSelectAsset={handleSelectAsset}
          size={size}
        />
      </Box>
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
};

AssetDialog.propTypes = {
  allowedTypes: PropTypes.arrayOf(PropTypes.string),
  initiallySelectedAssets: PropTypes.array,
  onFinish: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['S', 'M']),
};
