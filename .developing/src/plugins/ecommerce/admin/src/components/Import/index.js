import React, { useState } from 'react';
const fs = require('fs');

import xml2Json from '../../utils/xml2Json';
import DetailImport from './DetailImport';
import { AddAssetStep } from '../UploadAssetDialog/AddAssetStep/AddAssetStep';

import { ModalLayout } from '@strapi/design-system/ModalLayout';
import { useNotification } from '@strapi/helper-plugin';


const Import = ({ onClose }) => {
  const [ file, setFile ] = useState(null)
  const notification = useNotification();

  const convertHandler = async(file) => {
    if (file.ext === 'xml') {
      const json = await xml2Json(file)
      //console.dir(json)
      //json.elements.forEach(el => console.log(el))
      setFile(file)
      return
    }
    notification({ type: 'warning', message: 'Invalid extension' });
  }

  return (
    <ModalLayout onClose={ onClose } labelledBy='ImportLayout'>
      {
        !file &&
          <AddAssetStep
            onClose={ onClose }
            onAddAsset={ asset => convertHandler(asset[0]) }
            onlyOne={true}
          />
      }
      {
        file &&
          <DetailImport
            file={ file }
            onClose={() => setFile(false)}
          />
      }
    </ModalLayout>
  )
}

export default Import