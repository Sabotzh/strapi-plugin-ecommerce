import React, { useState } from 'react';

import { useIntl } from 'react-intl';
import { useFocusWhenNavigate } from '@strapi/helper-plugin';
import { HeaderLayout, Layout, ContentLayout } from '@strapi/design-system/Layout';
import { Box } from '@strapi/design-system/Box';
import { Stack } from '@strap/design-system/Stack';
import { Typography } from '@strapi/design-system/Typography';
import { TextInput } from '@strapi/design-system/TextInput';
import { Grid, GridItem } from '@strapi/design-system/Grid';
import { Button } from '@strapi/design-system/Button';
import Key from '@strapi/icons/Key';

import getTrad from '../../utils/getTrad';

const SettingsPage = () => {
  const [ token, setToken] = useState('');

  useFocusWhenNavigate();

  const submit = () => {
    if (!token) return
    console.log(token)
  }

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
