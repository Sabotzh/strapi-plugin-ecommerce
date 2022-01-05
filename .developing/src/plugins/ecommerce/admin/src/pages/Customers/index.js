import React from 'react';

import { useIntl } from 'react-intl';

import { useFocusWhenNavigate } from '@strapi/helper-plugin';
import { HeaderLayout } from '@strapi/design-system/Layout';

import getTrad from '../../utils/getTrad';

const CustomersPage = () => {
  useFocusWhenNavigate();

  const { formatMessage } = useIntl();
  const title = formatMessage({
    id: getTrad('customers.title'),
    defaultMessage: 'Customers',
  });

  return (
    <>
      <main>
        <HeaderLayout
          title={title}
          subtitle={formatMessage({
            id: getTrad('customers.description'),
            defaultMessage: 'Configure the ecommerce plugin',
          })}
        />
      </main>
    </>
  );
};

export default CustomersPage;
