import React, { useState } from 'react';

import PopupLoader from '../../../components/PopupLoader';
import InputImage from '../../../components/InputImage';
import Wysiwyg from '../../../components/Wysiwyg/Wysiwyg';
import validate, {numberValidate} from '../../../utils/validate';
import InputSlug from '../../../components/InputSlug';
import Translation from '../../../components/Translation';
import SeoModal from '../../../components/SeoModal';
import getTrad from '../../../utils/getTrad';

import CollectionType from '@strapi/icons/CollectionType';
import { ModalLayout, ModalBody, ModalHeader, ModalFooter } from '@strapi/design-system/ModalLayout';
import { useNotification } from '@strapi/helper-plugin';
import { Box } from '@strapi/design-system/Box';
import { Stack } from '@strapi/design-system/Stack';
import { Breadcrumbs, Crumb } from '@strapi/design-system/Breadcrumbs';
import { Typography } from '@strapi/design-system/Typography';
import { Divider } from '@strapi/design-system/Divider';
import { TextInput } from '@strapi/design-system/TextInput';
import { Grid, GridItem } from '@strapi/design-system/Grid';
import { Option, Select } from '@strapi/design-system/Select';
import { NumberInput } from '@strapi/design-system/NumberInput';
import { Button } from '@strapi/design-system/Button';
import { Textarea } from '@strapi/design-system/Textarea';
import { DatePicker } from '@strapi/design-system/DatePicker';
import { ToggleCheckbox } from '@strapi/design-system/ToggleCheckbox';
import { useIntl } from 'react-intl';


const statusArr = [ 'SELLING', 'ON_ORDER', 'UNAVAILABLE' ];

const Edit = ({ data, onClose, onUpdate, allCategories, allManufacturers }) => {
  const [ name, setName ] = useState(data.name);
  const [ slug, setSlug ] = useState(data.slug);
  const [ image, setImage ] = useState(data.image);
  const [ sku, setSku ] = useState(data.sku);
  const [ categories, setCategories ] = useState(data.categories.map(el => el.id));
  const [ price, setPrice ] = useState(data.price || undefined);
  const [ dateAvailable, setDateAvailable ] = useState(null);//data.dateAvailable
  const [ published, setPublished ] = useState(!!data.publishedAt);
  const [ manufacturer, setManufacturer ] = useState(data.manufacturer?.id);
  const [ quantity, setQuantity ] = useState(data.quantity || undefined);
  const [ minQuantity, setMinQuantity ] = useState(data.minQuantity || undefined);
  const [ status, setStatus ] = useState(data.status);
  const [ discount, setDiscount ] = useState(data.discount || undefined);
  const [ description, setDescription ] = useState(data.description);
  const [ shortDescription, setShortDescription ] = useState(data.shortDescription);
  const [ metaTitle, setMetaTitle ] = useState(data.metaTitle);
  const [ metaKeywords, setMetaKeywords ] = useState(data.metaKeywords);
  const [ metaDescription, setMetaDescription ] = useState(data.metaDescription);

  const notification = useNotification();
  const { formatMessage } = useIntl();

  const [ errors, setErrors] = useState({});
  const [ loader, setLoader ] = useState(false)


  const submitButtonHandler = async() => {
    setErrors({});

    const requireValidateResult = validate({
      name, slug, sku, price, shortDescription, description, metaTitle, metaKeywords, metaDescription
    });
    const numberValidateResult = numberValidate({ price, quantity, minQuantity, discount })

    if (!requireValidateResult.success && !numberValidateResult.success) {
      notification({ type: 'warning', message: 'Fill in all fields' })
      setErrors({ ...numberValidateResult.validateErrors, ...requireValidateResult.validateErrors });
      return
    }

    setLoader(true)
    onUpdate(data.id, {
      name, slug, sku, categories, price, dateAvailable, quantity, minQuantity, status, discount,
      description, shortDescription, metaDescription,metaTitle, metaKeywords, image, manufacturer
    })
      .then((res) => {
        setLoader(false)
        if (!res.success) return setErrors(res.data);
        onClose()
      })
  }

  return (
    <ModalLayout onClose={ onClose } labelledBy="Edit">
      <ModalHeader>
        <Stack horizontal size={2}>
          <CollectionType/>
          <Breadcrumbs label="Category model, name field">
            <Crumb>
              <Translation id={'products.title'} defaultMessage={'Products'}/>
            </Crumb>
            <Crumb>{ data.name }</Crumb>
          </Breadcrumbs>
        </Stack>
      </ModalHeader>
      <PopupLoader loader={loader}>
        <ModalBody>
          <Box paddingTop={4} paddingBottom={3}>
            <Typography variant={'beta'}>
              <Translation id={'modal.input.title'} defaultMessage={'Base Data'}/>
            </Typography>
          </Box>
          <Divider/>
          <Box paddingTop={5}>
            <Grid gap={5}>
              <GridItem col={6}>
                <TextInput
                  label={ <Translation id={'modal.input.label.name'} defaultMessage={'Name'}/> }
                  name="name"
                  value={ name }
                  onChange={ e => {
                    setName(e.target.value)
                  }}
                  error={ errors.name }
                />
              </GridItem>
              <GridItem col={6}>
                <InputSlug
                  label={ <Translation id={'modal.input.label.slug'} defaultMessage={'Slug'}/> }
                  name='Slug'
                  value={ slug }
                  onChange={ setSlug }
                  relationName={ name }
                  id={ data.id }
                  url={ 'products/create-slug' }
                  error={ errors.slug }
                />
              </GridItem>
              <GridItem col={12}>
                <InputImage
                  label={ <Translation id={'modal.input.label.image'} defaultMessage={'Image'}/> }
                  error={''}
                  selectedAsset={image}
                  deleteSelectedAsset={() => setImage(null)}
                  onFinish ={(image) => setImage(...image)}/>
              </GridItem>
              <GridItem col={12}>
                <Textarea
                  error={ errors.shortDescription }
                  label={ <Translation id={'modal.input.label.shortDescription'} defaultMessage={'Short Description'}/> }
                  name="short description"
                  onChange={e => setShortDescription(e.target.value)}>
                  { shortDescription }
                </Textarea>
              </GridItem>
              <GridItem col={6}>
                <Select
                  label={ <Translation id={'modal.input.label.categories'} defaultMessage={'Categories'}/> }
                  name='category'
                  value={ categories }
                  onChange={ setCategories }
                  customizeContent={values => {
                    const string = formatMessage({ id: getTrad('modal.input.label.elementsSelected'), defaultMessage: 'currently selected' });
                    return string + ' - ' + values.length
                  }}
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
                  label={ <Translation id={'modal.input.label.dateAvailable'} defaultMessage={'Date Available'}/> }
                  name="dateAvailable"
                  clearLabel={'Clear the datepicker'}
                  onClear={ () => setDateAvailable(null) }
                  selectedDateLabel={formattedDate => `Date picker, current is ${formattedDate}`}
                />
              </GridItem>
              <GridItem col={6}>
                <Select
                  label={ <Translation id={'modal.input.label.status'} defaultMessage={'Status'}/> }
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
                  label={ <Translation id={'modal.input.label.price'} defaultMessage={'Price'}/> }
                  value={ price }
                  onValueChange={ value => setPrice(value) }
                  error={ errors.price }
                />
              </GridItem>
              <GridItem col={3}>
                <NumberInput
                  name="discount"
                  label={ <Translation id={'modal.input.label.discount'} defaultMessage={'Discount %'}/> }
                  value={ discount }
                  onValueChange={ value => setDiscount(value) }
                  error={ errors.discount }
                />
              </GridItem>
              <GridItem col={6}>
                <Select
                  label={ <Translation id={'modal.input.label.manufacturer'} defaultMessage={'Manufacturer'}/> }
                  placeholder={ <Translation id={'modal.input.label.manufacturer'} defaultMessage={'Manufacturer'}/> }
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
                  label={ <Translation id={'modal.input.label.quantity'} defaultMessage={'Quantity'}/> }
                  value={quantity}
                  onValueChange={ value => setQuantity(value) }
                  error={ errors.quantity }
                />
              </GridItem>
              <GridItem col={3}>
                <NumberInput
                  name="minQuantity"
                  label={ <Translation id={'modal.input.label.minQuantity'} defaultMessage={'Minimal Quantity'}/> }
                  value={ minQuantity }
                  onValueChange={value => setMinQuantity(value)}
                  error={ errors.minQuantity }
                />
              </GridItem>
              <GridItem col={12}>
                <Wysiwyg
                  disabled={ false }
                  label={ <Translation id={'modal.input.label.description'} defaultMessage={'Description'}/> }
                  value={ description }
                  name='description'
                  onChange={ e => setDescription(e.target.value) }
                  error={ errors.description }
                />
              </GridItem>
              <GridItem col={6}>
                <Stack size={1}>
                  <Typography fontWeight={'bold'} variant={'pi'}>
                    <Translation id={'modal.input.label.published'} defaultMessage={'Published'}/>
                  </Typography>
                  <ToggleCheckbox onLabel={'On'} offLabel={'Off'} checked={ published } onChange={() => {setPublished(!published)}}>
                    <Translation id={'modal.input.label.published'} defaultMessage={'Published'}/>
                  </ToggleCheckbox>
                </Stack>
              </GridItem>
            </Grid>
            <SeoModal
              metaTitle={ metaTitle }
              setMetaTitle={ setMetaTitle }
              metaKeywords={ metaKeywords }
              setMetaKeywords={ setMetaKeywords }
              metaDescription={ metaDescription }
              setMetaDescription={ setMetaDescription }
              errors={ errors }
            />
          </Box>
        </ModalBody>
        <ModalFooter
          startActions = { <Button onClick = { onClose } variant="tertiary">
            { <Translation id={'modal.input.label.cancel'} defaultMessage={'Cancel'}/> }
          </Button> }
          endActions = { <Button onClick = { submitButtonHandler }>
            <Translation id={'manufacturers.description'} defaultMessage={'Configure the ecommerce plugin'}/>
          </Button> }
        />
      </PopupLoader>
    </ModalLayout>
  );
};

export default Edit;
