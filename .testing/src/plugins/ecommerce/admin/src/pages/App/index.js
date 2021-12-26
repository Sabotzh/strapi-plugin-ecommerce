import React from 'react';
import { useIntl } from 'react-intl';

import { useFocusWhenNavigate } from '@strapi/helper-plugin';
import { Helmet } from 'react-helmet';
import { Layout, HeaderLayout } from '@strapi/design-system/Layout';
import { Main } from '@strapi/design-system/Main';
import getTrad from '../../utils/getTrad';

const PluginPage = () => {
  useFocusWhenNavigate();
  const { formatMessage } = useIntl();


  const title = formatMessage({
    id: getTrad('name'),
    defaultMessage: 'Ecommerce',
  });

  return (
    <Layout>
      <Helmet title={title} />
      <Main>
        <HeaderLayout
          title={title}
          subtitle={formatMessage({
            id: getTrad('description'),
            defaultMessage: 'Configure the ecommerce plugin',
          })}
        />
      </Main>
    </Layout>
  );
};

export default PluginPage;
