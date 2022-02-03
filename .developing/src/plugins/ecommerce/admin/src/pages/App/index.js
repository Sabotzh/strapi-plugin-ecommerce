import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import pluginId from '../../pluginId';

import { useIntl } from 'react-intl';
import { Helmet } from 'react-helmet';

import { useFocusWhenNavigate, LoadingIndicatorPage } from '@strapi/helper-plugin';
import { Layout } from '@strapi/design-system/Layout';

import getTrad from '../../utils/getTrad';
import Navigation from '../../components/Navigation';

import Dashboard from '../Dashboard';
import Products from '../Products';
import Categories from '../Categories';
import Manufacturer from '../Manufacturer';
import Customers from '../Customers';
import Orders from '../Orders';
import Settings from '../Settings';

const App = () => {
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
        <Suspense fallback={<LoadingIndicatorPage />}>
          <Switch>
            <Route
              path={`/plugins/${pluginId}/dashboard`}
              component={Dashboard}
            />
            <Route
              path={`/plugins/${pluginId}/products`}
              component={Products}
            />
            <Route
              path={`/plugins/${pluginId}/categories`}
              component={Categories}
            />
            <Route
              path={`/plugins/${pluginId}/manufacturer`}
              component={Manufacturer}
            />
            <Route
              path={`/plugins/${pluginId}/customers`}
              component={Customers}
            />
            <Route
              path={`/plugins/${pluginId}/orders`}
              component={Orders}
            />
            <Route
              path={`/plugins/${pluginId}/settings`}
              component={Settings}
            />
          </Switch>
        </Suspense>
      </Layout>
    </>
  );
};

export default App;
