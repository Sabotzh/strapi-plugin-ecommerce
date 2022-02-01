import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Flex } from '@strapi/design-system/Flex';
import { Box } from '@strapi/design-system/Box';

import AssetDialog from "../AssetDialog"
import { EmptyInput } from './EmptyInput'
import { InputActions } from "./InputActions";
import {EditAssetDialog} from "../EditAssetDialog";


const InputImage = ({ onFinish, selectedAsset, deleteSelectedAsset }) => {
  const [ visible, setVisible ] = useState(false)
  const [ editVisible, setEditVisible ] = useState(false)
  console.log(visible && !editVisible)
  return (
    <Flex
      borderStyle={'solid'}
      borderWidth= '1px'
      borderColor={'neutral300'}
      borderRadius="4px"
      style={{ height: '10rem', position: 'relative' }}
      background={"neutral100"}
      padding={2}
      paddingBottom={4}
      direction="column"
      justifyContent="center"
      alignItems="center"
    >

      {
        visible && !editVisible && <AssetDialog
        initiallySelectedAssets={selectedAsset ? [ selectedAsset ]: undefined}
        onFinish={onFinish}
        onClose={() => setVisible(false)}/>
      }
      {
        editVisible && selectedAsset &&
        <EditAssetDialog
          asset={selectedAsset}
          onDeleteAsset={() => {
            deleteSelectedAsset()
            setEditVisible(false)
          }}
          onClose={() => setEditVisible(false)}/>
      }
      {
        !selectedAsset ? <EmptyInput onClick={() => setVisible(true)}/> :
          <Box height={'100%'}>
            <Box
              as="img"
              maxHeight="100%"
              maxWidth="auto"
              src={selectedAsset.url}
              alt={selectedAsset.alternativeText || selectedAsset.name}
            />
          </Box>
      }
      {
        selectedAsset &&
        <InputActions
          asset={selectedAsset}
          onDeleteAsset={ deleteSelectedAsset }
          onAddAsset={ () => setVisible(true) }
          onEditAsset={ () => setEditVisible(true) }
        />
      }
    </Flex>
  );
};

export default InputImage

InputImage.defaultProps = {
  selectedAsset: undefined,
};

InputImage.propTypes = {
  onFinish: PropTypes.func.require,
  selectedAsset: PropTypes.object,
  deleteSelectedAsset: PropTypes.func.require,
};
