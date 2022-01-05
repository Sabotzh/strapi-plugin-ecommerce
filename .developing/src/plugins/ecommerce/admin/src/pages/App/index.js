import React from 'react';
import { useIntl } from 'react-intl';

import { useFocusWhenNavigate } from '@strapi/helper-plugin';
import { Helmet } from 'react-helmet';
import { Layout, HeaderLayout } from '@strapi/design-system/Layout';

import getTrad from '../../utils/getTrad';
import Navigation from "../../components/Navigation";

const PluginPage = () => {
  useFocusWhenNavigate();
  const { formatMessage } = useIntl();


  const title = formatMessage({
    id: getTrad('name'),
    defaultMessage: 'Ecommerce',
  });

  return (
    <>
      <Helmet title={title} />
      <Layout sideNav={<Navigation/>}>
        <main>
          <HeaderLayout
            title={title}
            subtitle={formatMessage({
              id: getTrad('description'),
              defaultMessage: 'Configure the ecommerce plugin',
            })}
          />
        </main>
      </Layout>
    </>
  );
};

export default PluginPage;
