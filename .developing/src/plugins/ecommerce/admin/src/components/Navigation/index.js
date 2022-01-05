import React from 'react';

import { LocalMall } from '@material-ui/icons';
import { Dashboard } from '@material-ui/icons';
import { Category } from '@material-ui/icons';
import { RecentActors } from '@material-ui/icons';
import { CardGiftcard } from '@material-ui/icons';
import { Settings } from '@material-ui/icons';

import getTrad from '../../utils/getTrad';
import { FormattedMessage } from 'react-intl';

import {
  SubNav,
  SubNavHeader,
  SubNavLink,
  SubNavSections,
} from '@strapi/design-system/SubNav';


const Navigation = () => {
  const links = [
    { id: 1, label: getTrad('menu.dashboard.name'), link: 'dashboard', icon: <Dashboard viewBox="0 0 26 18"/> },
    { id: 2, label: getTrad('menu.products.name'), link: 'products', icon: <LocalMall viewBox="0 0 26 18"/> },
    { id: 3, label: getTrad('menu.categories.name'), link: 'categories', icon: <Category viewBox="0 0 26 18"/> },
    { id: 4, label: getTrad('menu.customers.name'), link: 'customers', icon: <RecentActors viewBox="0 0 26 18"/> },
    { id: 5, label: getTrad('menu.orders.name'), link: 'orders', icon: <CardGiftcard viewBox="0 0 26 18"/> },
    { id: 6, label: getTrad('menu.settings.name'), link: 'settings', icon: <Settings viewBox="0 0 26 18"/> }]

  return (
    <SubNav ariaLabel='Ecommerce'>
      <SubNavHeader label='Ecommerce' />
      <SubNavSections style={{ marginLeft: '-8px' }}>
          {
            links.map(link =>
              <SubNavLink
                to={`/plugins/ecommerce/${link.link}`}
                key={link.id} icon={link.icon}
              >
                <FormattedMessage id={link.label}/>
              </SubNavLink>)
          }
      </SubNavSections>
    </SubNav>
  )
};

export default Navigation;
