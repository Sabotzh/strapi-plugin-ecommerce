import React, { useState } from 'react';

import Wysiwyg from '../../../components/Wysiwyg/Wysiwyg';
import InputImage from '../../../components/InputImage';
import validate, { numberValidate } from '../../../utils/validate';
import PopupLoader from '../../../components/PopupLoader';
import InputSlug from '../../../components/InputSlug';

import CollectionType from '@strapi/icons/CollectionType';
import { ModalLayout, ModalBody, ModalHeader, ModalFooter } from '@strapi/design-system/ModalLayout';
import { Box } from '@strapi/design-system/Box';
import { useNotification } from '@strapi/helper-plugin';
import { Stack } from '@strapi/design-system/Stack';
import { Breadcrumbs, Crumb } from '@strapi/design-system/Breadcrumbs';
import { Typography } from '@strapi/design-system/Typography';
import { Divider } from '@strapi/design-system/Divider';
import { TextInput } from '@strapi/design-system/TextInput';
import { Grid, GridItem } from '@strapi/design-system/Grid';
import { Option, Select } from "@strapi/design-system/Select";
import { NumberInput } from '@strapi/design-system/NumberInput';
import { Button } from '@strapi/design-system/Button';
import { Textarea } from "@strapi/design-system/Textarea";
import { DatePicker } from '@strapi/design-system/DatePicker';
import { ToggleCheckbox } from '@strapi/design-system/ToggleCheckbox';


const statusArr = [ 'SELLING', 'ON_ORDER', 'UNAVAILABLE' ];

const Create = ({ onClose, onCreate, allCategories, allManufacturers }) => {
  const [ name, setName ] = useState('');
  const [ slug, setSlug ] = useState('');
  const [ sku, setSku ] = useState('');
  const [ categories, setCategories ] = useState([]);
  const [ price, setPrice ] = useState(0);
  const [ dateAvailable, setDateAvailable ] = useState();
  const [ manufacturer, setManufacturer ] = useState();
  const [ quantity, setQuantity ] = useState(0);
  const [ minQuantity, setMinQuantity ] = useState(0);
  const [ status, setStatus ] = useState(statusArr[0]);
  const [ discount, setDiscount ] = useState(0);
  const [ published, setPublished ] = useState(false);
  const [ description, setDescription ] = useState('');
  const [ shortDescription, setShortDescription ] = useState('');
  const [ image, setImage ] = useState(null);
  const [ metaTitle, setMetaTitle ] = useState('');
  const [ metaKeywords, setMetaKeywords ] = useState('');
  const [ metaDescription, setMetaDescription ] = useState('');

  const notification = useNotification();
  const [ errors, setErrors] = useState({});
  const [ loader, setLoader ] = useState(false);

  const submitButtonHandler = async() => {
    setErrors({});

    const requireValidateResult = validate({
      name, slug, sku, price, shortDescription, description, metaTitle, metaKeywords, metaDescription
    });
    const numberValidateResult = numberValidate({ price, quantity, minQuantity, discount })

    if (!requireValidateResult.success && !numberValidateResult.success) {
      notification({ type: 'warning', message: 'Fill in all fields' })
      setErrors({ ...numberValidateResult.validateErrors, ...requireValidateResult.validateErrors});
      return
    }

    setLoader(true)
    onCreate({
      name, slug, sku, categories, price, dateAvailable, quantity, minQuantity, status, discount, description,
      shortDescription, image, metaDescription, metaTitle, metaKeywords, publishedAt: published, manufacturer
    })
      .then((res) => {
        setLoader(false)
        if (!res.success) return setErrors(res.data);
        onClose()
      })
  }

  return (
    <ModalLayout onClose={ () => onClose() } labelledBy="Edit">
      <ModalHeader>
        <Stack horizontal size={2}>
          <CollectionType/>
          <Breadcrumbs label="Category model, name field">
            <Crumb>Products</Crumb>
          </Breadcrumbs>
        </Stack>
      </ModalHeader>
      <PopupLoader loader={loader}>
        <ModalBody>
          <Box paddingTop={4} paddingBottom={3}><Typography variant={'beta'}>Create</Typography></Box>
          <Divider/>
          <Box paddingTop={5}>
            <Grid gap={5}>
              <GridItem col={6}>
                <TextInput
                  label="Name"
                  name="name"
                  value={ name }
                  onChange={ e => setName(e.target.value) }
                  error={ errors.name }
                />
              </GridItem>
              <GridItem col={6}>
                <InputSlug
                  placeholder='Slug'
                  label='Slug'
                  name='Slug'
                  value={ slug }
                  onChange={ setSlug }
                  relationName={ name }
                  id={ -1 }
                  url={ 'products/create-slug' }
                  error={ errors.slug }
                />
              </GridItem>
              <GridItem col={12}>
                <InputImage
                  label={'Image'}
                  selectedAsset={image}
                  deleteSelectedAsset={() => setImage(null)}
                  onFinish={(image) => setImage(...image)}
                />
              </GridItem>
              <GridItem col={12}>
                <Textarea
                  error={ errors.shortDescription }
                  label="Short description"
                  name="short description"
                  onChange={e => setShortDescription(e.target.value)}>
                  { shortDescription }
                </Textarea>
              </GridItem>
              <GridItem col={6}>
                <Select
                  label={'Category'}
                  name='category'
                  value={ categories }
                  onChange={ setCategories }
                  customizeContent={values => `${values.length} currently selected`}
                  multi
                >
                  { allCategories.map((entry) => <Option value={entry.id} key={entry.id}>{ entry.name }</Option>) }
                </Select>
              </GridItem>
              <GridItem col={3}>
                <TextInput
                  name="sku"
                  label="SKU"
                  value={sku}
                  onChange={ e => setSku(e.target.value) }
                  error={ errors.sku }
                />
              </GridItem>
              <GridItem col={3}>
                <DatePicker
                  onChange={ setDateAvailable }
                  selectedDate={ dateAvailable }
                  label="Date available"
                  name="dateAvailable"
                  clearLabel={'Clear the datepicker'}
                  onClear={ () => setDateAvailable(null) }
                  selectedDateLabel={formattedDate => `Date picker, current is ${formattedDate}`}
                />
              </GridItem>
              <GridItem col={6}>
                <Select
                  label={'Status'}
                  name="status"
                  value={ status }
                  onChange={ setStatus }
                >
                  { statusArr.map((entry, id) => <Option value={entry} key={id}>{ entry }</Option>) }
                </Select>
              </GridItem>
              <GridItem col={3}>
                <NumberInput
                  name="price"
                  label="Price"
                  value={price}
                  onValueChange={ setPrice }
                  error={ errors.price }
                />
              </GridItem>
              <GridItem col={3}>
                <NumberInput
                  name="discount"
                  label="Discount %"
                  value={discount}
                  onValueChange={ setDiscount }
                  error={ errors.discount }
                />
              </GridItem>
              <GridItem col={6}>
                <Select
                  label={ "Manufacturer" }
                  placeholder={ "Manufacturer" }
                  name='manufacturer'
                  value={ manufacturer }
                  onChange={ setManufacturer }
                  onClear={ () => setManufacturer(null) }
                >
                  { allManufacturers.map((entry) => {
                    return <Option value={ entry.id } key={entry.id}>{ entry.name }</Option>
                  })}
                </Select>
              </GridItem>
              <GridItem col={3}>
                <NumberInput
                  name="quantity"
                  label="Quantity"
                  value={quantity}
                  onValueChange={value => setQuantity(value)}
                  error={ errors.quantity }
                />
              </GridItem>
              <GridItem col={3}>
                <NumberInput
                  name="minQuantity"
                  label="Min_Quantity"
                  value={ minQuantity }
                  onValueChange={value => setMinQuantity(value)}
                  error={ errors.minQuantity }
                />
              </GridItem>
              <GridItem col={12}>
                <Wysiwyg
                  disabled={ false }
                  label={ 'Description' }
                  value={ description }
                  name='description'
                  onChange={ e => setDescription(e.target.value) }
                  error={ errors.description }
                />
              </GridItem>
              <GridItem col={6}>
                <Stack size={1}>
                  <Typography fontWeight={'bold'} variant={'pi'}>Published</Typography>
                  <ToggleCheckbox onLabel={'On'} offLabel={'Off'} checked={ published } onChange={() => {setPublished(!published)}}>
                    Published
                  </ToggleCheckbox>
                </Stack>
              </GridItem>
            </Grid>
            <Box paddingTop={5} paddingBottom={3}><Typography variant={'beta'}>SEO</Typography></Box>
            <Grid gap={5}>
              <GridItem col={6}>
                <TextInput
                  label="Meta_title"
                  name="metaTitle"
                  value={ metaTitle }
                  onChange={ e => setMetaTitle(e.target.value) }
                  error={ errors.metaTitle }
                />
              </GridItem>
              <GridItem col={6}>
                <TextInput
                  label="Meta_keywords"
                  name="metaKeywords"
                  value={ metaKeywords }
                  onChange={ e => setMetaKeywords(e.target.value) }
                  error={ errors.metaKeywords }
                />
              </GridItem>
              <GridItem col={12}>
                <Textarea error={ errors.metaDescription } label="Meta_description" name="metaDescription" onChange={e => setMetaDescription(e.target.value)}>
                  { metaDescription }
                </Textarea>
              </GridItem>
            </Grid>
          </Box>
        </ModalBody>
        <ModalFooter
          startActions = { <Button onClick = { onClose } variant="tertiary"> Cancel </Button> }
          endActions = { <Button onClick = { submitButtonHandler }> Finish </Button> }
        />
      </PopupLoader>
    </ModalLayout>
  );
};

export default Create;
