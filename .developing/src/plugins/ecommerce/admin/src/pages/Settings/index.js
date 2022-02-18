import React, { useState, useEffect } from 'react';
import axios from 'axios';

import getTrad from '../../utils/getTrad';


import { useIntl } from 'react-intl';
import { useFocusWhenNavigate } from '@strapi/helper-plugin';
import { HeaderLayout, Layout, ContentLayout } from '@strapi/design-system/Layout';
import { Box } from '@strapi/design-system/Box';
import { Stack } from '@strapi/design-system/Stack';
import { Typography } from '@strapi/design-system/Typography';
import { TextInput } from '@strapi/design-system/TextInput';
import { Grid, GridItem } from '@strapi/design-system/Grid';
import { Button } from '@strapi/design-system/Button';
import { useNotification } from '@strapi/helper-plugin';
import Key from '@strapi/icons/Key';


const SettingsPage = () => {
  const [ token, setToken] = useState('');
  const notification = useNotification();
  useFocusWhenNavigate();

  const submit = async () => {
    if (!token) return
    const { data } = await axios({
      method: 'put',
      url: `${strapi.backendURL}/api/ecommerce/settings/token`,
      data: { value: token }
    })
    if (data) {
      notification({ type: 'success', message: 'Token updated' })
      setToken(data.value)
    }
  }

  const getToken = async () => {
    const { data } = await axios.get(`${strapi.backendURL}/api/ecommerce/settings/token`)
    if (data) setToken(data.value)
  }
  useEffect(() => {
    getToken()
  }, [])

  const { formatMessage } = useIntl();
  const title = formatMessage({
    id: getTrad('settings.title'),
    defaultMessage: 'Settings',
  });

  return (
    <Layout>
      <main>
        <HeaderLayout
          title={title}
          subtitle={formatMessage({
            id: getTrad('settings.description'),
            defaultMessage: 'Configure the ecommerce plugin',
          })}
        />
        <ContentLayout>
          <Box
            hasRadius
            background='neutral0'
            shadow='tableShadow'
            paddingTop={7}
            paddingBottom={7}
            paddingRight={6}
            paddingLeft={6}
          >
            <Stack size={4}>
              <Typography variant="delta" as='h2'>Configuration</Typography>
              <Grid gap={5}>
                <GridItem col={6} s={12}>
                  <TextInput
                    name='token'
                    label='Token'
                    onChange={ e => setToken(e.target.value) }
                    value={ token }
                  />
                </GridItem>
              </Grid>
              <GridItem col={7} s={12}>
                <Button
                  onClick={ submit }
                  startIcon={<Key />}
                >
                  Save
                </Button>
              </GridItem>
            </Stack>
          </Box>
        </ContentLayout>
      </main>
    </Layout>
  );
};

export default SettingsPage;
