import React, { useState } from 'react';
import axios from 'axios';

import getTrad from '../../utils/getTrad';
import { FromComputerForm } from '../UploadAssetDialog/AddAssetStep/FromComputerForm';
import xmlParser from '../../utils/parsers/xml';
import DetailImport from './DetailImport';

import File from '@strapi/icons/File';
import { ProgressBar } from '@strapi/design-system/ProgressBar';
import { ModalHeader } from '@strapi/design-system/ModalLayout';
import { Typography } from '@strapi/design-system/Typography';
import { useIntl } from 'react-intl';
import { ModalLayout } from '@strapi/design-system/ModalLayout';
import { useNotification } from '@strapi/helper-plugin';


const Import = ({ onClose }) => {
  const [ file, setFile ] = useState(null)
  const [ loading, setLoading ] = useState(true)
  const [ loader, setLoader ] = useState(0)

  const { formatMessage } = useIntl();
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
    const loaderStep =  100 / products.length
    for (const product of products) {
      if (!product.name) {
        setLoader(prev => prev + loaderStep)
        continue
      }

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
        .then(() => {
          setLoader(prev => prev + loaderStep)
        })
    }
  }

  const convertHandler = async(file) => {
    if (file.ext === 'xml') {
      setFile(file)
      const products = await xmlParser(file)
      await createProducts(products)
      setLoading(false)
      return
    }
    notification({ type: 'warning', message: 'Invalid extension' });
  }

  return (
    <ModalLayout onClose={ onClose } labelledBy='ImportLayout'>
      {
        loading &&
          <>
            <ModalHeader>
              <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
                {formatMessage({
                  id: getTrad('header.actions.import'),
                  defaultMessage: 'Import',
                })}
              </Typography>
            </ModalHeader>
            <FromComputerForm
              title={'Drag & Drop .xml here or'}
              picture={ <File/> }
              onClose={onClose}
              onAddAssets={asset => convertHandler(asset[0])}
              onlyOne={true}
            />
              <ProgressBar style={{width: '100%'}} value={loader} size="S">
                {`${loader}/100%`}
              </ProgressBar>
          </>
      }
      {
        !loading &&
          <DetailImport
            file={ file }
            onClose={() => setFile(false)}
          />
      }
    </ModalLayout>
  )
}

export default Import