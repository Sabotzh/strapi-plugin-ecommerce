import React, { useState } from 'react';
import axios from 'axios';

import getTrad from '../../utils/getTrad';
import xmlParser from '../../utils/parsers/xml';
import xlsxParser from '../../utils/parsers/xlsx';
import DetailImport from './DetailImport';
import AssetCard from './AssetCard';
import { FromComputerForm } from '../UploadAssetDialog/AddAssetStep/FromComputerForm';

import File from '@strapi/icons/File';
import { ProgressBar } from '@strapi/design-system/ProgressBar';
import { ModalHeader, ModalLayout, ModalFooter } from '@strapi/design-system/ModalLayout';
import { Typography } from '@strapi/design-system/Typography';
import { Button } from '@strapi/design-system/Button';
import { Box } from '@strapi/design-system/Box';
import { Divider } from '@strapi/design-system/Divider';
import { Flex } from '@strapi/design-system/Flex';
import { useIntl } from 'react-intl';
import { useNotification } from '@strapi/helper-plugin';
import { Tabs, Tab, TabGroup, TabPanels, TabPanel } from '@strapi/design-system/Tabs';
import { Grid, GridItem } from '@strapi/design-system/Grid';


const Import = ({ onClose }) => {
  const [ file, setFile ] = useState(null)
  const [ loading, setLoading ] = useState(true)
  const [ loader, setLoader ] = useState(0)

  const [ fileXLSXCategories, setFileXLSXCategories ] = useState(null)
  const [ fileXLSXProducts, setFileXLSXProducts ] = useState(null)

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

  const convertHandler = async(file, ext) => {
    if (ext === 'xlsx') {
      if (file.ext === 'xlsx' || file.ext === 'xls') {
        const products = await xlsxParser(file)
        console.log(products)
        return
      }
    }
    if (ext === 'xml' && file.ext === 'xml') {
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
            <TabGroup
              label={formatMessage({
                id: getTrad('CHANGE-ID'),
                defaultMessage: 'How do you want to upload your assets?',
              })}
              variant="simple"
            >
              <Flex paddingLeft={8} paddingRight={8} paddingTop={6} justifyContent="space-between">
                <Tabs>
                  <Tab>
                    {formatMessage({
                      id: getTrad('modal.nav.browse'),
                      defaultMessage: 'XML',
                    })}
                  </Tab>
                  <Tab>
                    {formatMessage({
                      id: getTrad('CHANGE-ID'),
                      defaultMessage: 'XLS | XLSX',
                    })}
                  </Tab>
                </Tabs>
              </Flex>
              <Divider />
              <TabPanels>
                <TabPanel>
                  <FromComputerForm
                    title={'Drag & Drop here or'}
                    picture={ <File/> }
                    onClose={onClose}
                    onAddAssets={asset => convertHandler(asset[0], 'xml')}
                    onlyOne={true}
                  />
                  <ModalFooter
                    startActions={
                      <Button onClick={onClose} variant="tertiary">
                        {formatMessage({ id: 'app.components.Button.cancel', defaultMessage: 'Cancel' })}
                      </Button>
                    }
                  />
                </TabPanel>
                <TabPanel>
                  <Grid gap={1}>
                    <GridItem col={6}>
                      {
                        !fileXLSXProducts
                          ? <FromComputerForm
                          title={'Drag & Drop products here or'}
                          picture={<File/>}
                          onClose={onClose}
                          onAddAssets={asset => setFileXLSXProducts(asset[0])}
                          onlyOne={true}
                        />
                          : <AssetCard/>
                      }
                    </GridItem>
                    <GridItem col={6}>
                      <FromComputerForm
                        title={'Drag & Drop categories here or'}
                        picture={ <File/> }
                        onClose={onClose}
                        onAddAssets={asset => setFileXLSXCategories(asset[0])}
                        onlyOne={true}
                      />
                    </GridItem>
                  </Grid>
                  <ModalFooter
                    startActions={
                      <Button onClick={onClose} variant="tertiary">
                        {formatMessage({ id: 'CHANGE-ID', defaultMessage: 'Cancel' })}
                      </Button>
                    }
                    endActions={
                      <Button
                        onClick={ () => convertHandler(
                          { products: fileXLSXProducts, categories: fileXLSXCategories },
                          'xml'
                        )}
                        variant="tertiary"
                        disabled={!(fileXLSXProducts && fileXLSXCategories)}
                      >
                        {formatMessage({ id: 'CHANGE-ID', defaultMessage: 'Import' })}
                      </Button>
                    }
                  />
                </TabPanel>
              </TabPanels>
            </TabGroup>
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