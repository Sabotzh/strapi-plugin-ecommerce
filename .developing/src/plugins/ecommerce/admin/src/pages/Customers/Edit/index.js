import React, { useState } from 'react';

import PopupLoader from '../../../components/PopupLoader';
import validate from '../../../utils/validate';

import CollectionType from '@strapi/icons/CollectionType';
import { ModalLayout, ModalBody, ModalHeader, ModalFooter } from '@strapi/design-system/ModalLayout';
import { Box } from '@strapi/design-system/Box';
import { Stack } from '@strapi/design-system/Stack';
import { Breadcrumbs, Crumb } from '@strapi/design-system/Breadcrumbs';
import { Typography } from '@strapi/design-system/Typography';
import { Divider } from '@strapi/design-system/Divider';
import { TextInput } from '@strapi/design-system/TextInput';
import { Grid, GridItem } from '@strapi/design-system/Grid';
import { Button } from '@strapi/design-system/Button';


const Edit = ({ data, onClose, onUpdate }) => {
  const [ firstname, setFirstname ] = useState(data.firstname);
  const [ middlename, setMiddlename ] = useState(data.middlename);
  const [ lastname, setLastname ] = useState(data.lastname);
  const [ email, setEmail ] = useState(data.email);
  const [ phone, setPhone ] = useState(data.phone);

  const [ errors, setErrors] = useState({});
  const [ loader, setLoader ] = useState(false)

  const submitButtonHandler = async() => {
    setErrors({});

    let { success, validateErrors } = validate({
      firstname, middlename, lastname, email, phone
    }, errors, setErrors);

    if (success) {
      setLoader(true)
      onUpdate(data.id, {
        firstname, middlename, lastname, email, phone
      })
        .then(res => {
          setLoader(false)
          if (res) onClose()
        });
    } else {
      setErrors(validateErrors);
    }
  }

  return (
    <ModalLayout onClose={ onClose } labelledBy="Edit">
      <ModalHeader>
        <Stack horizontal size={2}>
          <CollectionType/>
          <Breadcrumbs label="Category model, name field">
            <Crumb>Customer</Crumb>
            <Crumb>{ data.firstname + ' ' + data.middlename + ' ' + data.lastname }</Crumb>
          </Breadcrumbs>
        </Stack>
      </ModalHeader>
      <PopupLoader loader={loader}>
        <ModalBody>
          <Box paddingTop={4} paddingBottom={3}>
            <Typography variant={'beta'}>{ data.firstname + ' ' + data.middlename + ' ' + data.lastname }</Typography>
          </Box>
          <Divider/>
          <Box paddingTop={5}>
            <Grid gap={5}>
              <GridItem col={6}>
                <TextInput
                  name="email"
                  label="Email"
                  value={ email }
                  onChange={ e => setEmail(e.target.value) }
                  error={ errors.email }
                />
              </GridItem>
              <GridItem col={6}>
                <TextInput
                  name="phone"
                  label="Phone"
                  value={ phone }
                  onChange={ e => setPhone(e.target.value) }
                  error={ errors.phone }
                />
              </GridItem>
              <GridItem col={6}>
                <TextInput
                  label="First name"
                  name="firstName"
                  value={ firstname }
                  onChange={ e => {
                    setFirstname(e.target.value)
                  }}
                  error={ errors.firstname }
                />
              </GridItem>
              <GridItem col={6}>
                <TextInput
                  name="lastName"
                  label="Last name"
                  value={ lastname }
                  onChange={ e => setLastname(e.target.value) }
                  error={ errors.lastname }
                />
              </GridItem>
              <GridItem col={6}>
                <TextInput
                  name="secondName"
                  label="Second name"
                  value={ middlename }
                  onChange={ e => setMiddlename(e.target.value) }
                  error={ errors.middlename }
                />
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

export default Edit;
