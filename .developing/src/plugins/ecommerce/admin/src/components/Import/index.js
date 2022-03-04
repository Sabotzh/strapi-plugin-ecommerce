import React, { useState } from 'react';

import xmlParser from '../../utils/parsers/xml';
import DetailImport from './DetailImport';
import { AddAssetStep } from '../UploadAssetDialog/AddAssetStep/AddAssetStep';

import { ModalLayout } from '@strapi/design-system/ModalLayout';
import { useNotification } from '@strapi/helper-plugin';
import axios from "axios";
import { urlsToAssets } from "../../utils/urlsToAssets";


const Import = ({ onClose }) => {
  const [ file, setFile ] = useState(null)
  const notification = useNotification();

  const post = (data, url) => {
    return axios({
      method: 'post',
      url: `${strapi.backendURL}/api/ecommerce/${url}`,
      data
    })
      .then(res => {
        return res.data
      });
  }

  const createCategoryRelations = async(categories) => {
    let parentId
    for (let categoryName of categories.split('>')) {
      categoryName = categoryName.trim();
      if (!parentId) {
        const response = await post({ name: categoryName.replace("&amp;", "&") },'categories/get-create')
        parentId = response['category'].id
        continue
      }
      const response = await post(
        { name: categoryName.replace("&amp;", "&"), parentCategory: parentId },
        'categories/get-create'
      )
      parentId = response['category'].id
    }
    return parentId
  }

  const getOrCreateCategory = async (categories) => {
    const categoriesIds = []
    for (const categoryName of categories) {
      if (categoryName.split('>').length > 1) {
        categoriesIds.push(await createCategoryRelations(categoryName))
        continue
      }
      const { category } = await post({ name: categoryName.replace("&amp;", "&") }, 'categories/get-create')
      categoriesIds.push(category.id)
    }
    return categoriesIds
  }

  const getOrCreateManufacturer = async (manufacturerName) => {
    const { manufacturer } = await post({ name: manufacturerName }, 'manufacturer/get-create')
    return manufacturer.id
  }

  const createProducts = async (products) => {
    for (const product of products) {
      if (!product.name) continue

      let manufacturerId = null
      let categoriesIds = null
      if (product.categories) categoriesIds = await getOrCreateCategory(product.categories)
      if (product.manufacturer && product.manufacturer !== '-') {
        manufacturerId = await getOrCreateManufacturer(product.manufacturer)
      }

      product.price = product.price[0] === '$' ? product.price.slice(1) : product.price
      // 'https://i.pinimg.com/originals/56/7a/4c/567a4cc9870f8d8e3d03362732760e2c.jpg'
      // product.image = await urlsToAssets([product.image]) || null
      product.image = null
      post({ ...product, categories: categoriesIds, manufacturer: manufacturerId }, 'products/get-create')
    }
  }

  const convertHandler = async(file) => {
    if (file.ext === 'xml') {
      const products = await xmlParser(file)
      await createProducts(products)

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