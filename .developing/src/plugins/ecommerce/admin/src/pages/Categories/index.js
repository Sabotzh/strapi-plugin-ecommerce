import React from 'react';

import { useIntl } from 'react-intl';

import { useFocusWhenNavigate } from '@strapi/helper-plugin';
import { HeaderLayout } from '@strapi/design-system/Layout';

import getTrad from '../../utils/getTrad';

const CategoriesPage = () => {
  useFocusWhenNavigate();

  const { formatMessage } = useIntl();
  const title = formatMessage({
    id: getTrad('categories.title'),
    defaultMessage: 'Categories',
  });

  return (
    <>
      <main>
        <HeaderLayout
          title={title}
          subtitle={formatMessage({
            id: getTrad('categories.description'),
            defaultMessage: 'Configure the ecommerce plugin',
          })}
        />
      </main>
    </>
  );
};

export default CategoriesPage;
