import React, { useState } from 'react';

import xmlParser from '../../utils/parsers/xml';
import DetailImport from './DetailImport';
import { AddAssetStep } from '../UploadAssetDialog/AddAssetStep/AddAssetStep';

import { ModalLayout } from '@strapi/design-system/ModalLayout';
import { useNotification } from '@strapi/helper-plugin';
import axios from "axios";


const Import = ({ onClose }) => {
  const [ file, setFile ] = useState(null)
  const notification = useNotification();

  const fetch = (data, url) => {
    return axios({
      method: 'post',
      url: `${strapi.backendURL}/api/ecommerce/${url}`,
      data
    })
      .then(res => {
        return res.data
      });
  }
  // for (const familyCategory of category.split(' > ')) {
  //   const contents = await fs.readFile(file, 'utf8');
  //   console.log(contents);
  // }
  const createCategoryRelations = async(categories) => {
    let parentId
    for (let categoryName of categories.split('>')) {
      categoryName = categoryName.trim();
      if (!parentId) {
        const response = await fetch({ name: categoryName.replace("&amp;", "&") },'categories/get-create')
        parentId = response['category'].id
        continue
      }
      const response = await fetch(
        { name: categoryName.replace("&amp;", "&"), parentCategory: parentId },
        'categories/get-create'
      )
      parentId = response['category'].id
    }
  }

  const getOrCreateCategory = async (categories) => {
    for (const category of categories) {
      if (category.split('>').length > 1) {
        await createCategoryRelations(category)
        continue
      }
      await fetch({ name: category.replace("&amp;", "&") }, 'categories/get-create')
    }
  }

  const createProducts = async (products) => {
    for (const product of products) {
      //console.log(product)
      if (product.categories) await getOrCreateCategory(product.categories)
    }
  }

  const convertHandler = async(file) => {
    if (file.ext === 'xml') {
      const products = await xmlParser(file)
      await createProducts(products)
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