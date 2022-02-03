import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Flex } from '@strapi/design-system/Flex';
import { Box } from '@strapi/design-system/Box';
import { Stack } from '@strapi/design-system/Stack';
import { request } from '@strapi/helper-plugin';
import AssetDialog from "../AssetDialog"
import { Field, FieldLabel, FieldHint, FieldError, FieldInput, FieldAction } from '@strapi/design-system/Field';
import { EmptyInput } from './EmptyInput'
import { InputActions } from "./InputActions";
import { EditAssetDialog } from "../EditAssetDialog";
import { UploadAssetDialog } from "../UploadAssetDialog/UploadAssetDialog";
import { ext } from "../../utils/getExt";
import axios from "axios";
import { ConfirmDialog } from '@strapi/helper-plugin';


const InputImage = ({ onFinish, selectedAsset, deleteSelectedAsset, label, error }) => {
  const [ visible, setVisible ] = useState(false)
  const [ editVisible, setEditVisible ] = useState(false)
  const [ uploadVisible, setUploadVisible ] = useState(false)
  const [ loading, setLoading ] = useState(true)
  const [ uploadError, setUploadError ] = useState(false)
  const [ data, setData ] = useState([])
  const [ editableAsset, setEditableAsset ] = useState(undefined)

  const [ selectDelete, setSelectDelete ] = useState(undefined)


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
      .catch(() => setUploadError(true));
  }

  const deleteAsset = async(id) => {
    axios({
      method: 'delete',
      url: `http://localhost:1337/api/upload/files/${id}`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(() => getData());
    setSelectDelete(undefined)
    setEditableAsset(undefined)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Field error={error}>
      <Stack size={1}>
        <FieldLabel>{ label }</FieldLabel>
        <Flex
          borderStyle={'solid'}
          borderWidth= '1px'
          borderColor={ !error ? 'neutral300' : 'danger600'}
          borderRadius="4px"
          style={{ height: '10rem', position: 'relative' }}
          background={"neutral100"}
          padding={2}
          paddingBottom={4}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <ConfirmDialog
            isOpen={selectDelete}
            onConfirm={() => deleteAsset(selectDelete)}
            onToggleDialog={() => setSelectDelete(undefined)}
          />

          {
            visible && !editVisible && (
              <AssetDialog
                assets={data}
                deleteAsset={setSelectDelete}
                loading={loading}
                error={uploadError}
                initiallySelectedAssets={selectedAsset ? [ selectedAsset ]: undefined}
                onFinish={onFinish}
                uploadOpen={() => setUploadVisible(true)}
                onClose={() => setVisible(false)}
                onEdit={setEditableAsset}
                editAsset={editableAsset}
              />
            )
          }

          {
            editableAsset && (
              <EditAssetDialog
                asset={editableAsset}
                onDeleteAsset={setSelectDelete}
                onClose={() => setEditableAsset(undefined)}
              />
            )
          }

          {
            editVisible && selectedAsset && (
              <EditAssetDialog
                asset={selectedAsset}
                onDeleteAsset={() => {
                  deleteSelectedAsset()
                  setEditVisible(false)
                }}
                onClose={() => setEditVisible(false)}
              />
            )
          }

          { uploadVisible && (
            <UploadAssetDialog
              onClose={() => setUploadVisible(false)}
              updateAssets = { () => getData() }
            />
          )}

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
        <FieldError/>
      </Stack>
    </Field>
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
