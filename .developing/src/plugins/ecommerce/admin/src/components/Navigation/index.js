import React from 'react';

import pluginId from '../../pluginId'

import ExclamationMarkCircle from '@strapi/icons/ExclamationMarkCircle';
import Apps from '@strapi/icons/Apps';

import {
  SubNav,
  SubNavHeader,
  SubNavLink,
  SubNavSections,
} from '@strapi/design-system/SubNav';


const Navigation = () => {
  const links = [
    { id: 1, label: 'Dashboard', link: 'dashboard', icon: <ExclamationMarkCircle /> },
    { id: 2, label: 'Products', link: 'products', icon: <Apps /> },
    { id: 3, label: 'Categories', link: 'categories', icon: <ExclamationMarkCircle /> },
    { id: 4, label: 'Customers', link: 'customers', icon: <Apps /> },
    { id: 5, label: 'Orders', link: 'orders', icon: <ExclamationMarkCircle /> },
    { id: 6, label: 'Settings', link: 'settings', icon: <Apps /> },
  ];

  return (
    <nav style={{ height: '100vh', padding: '10px' }}>
      <SubNav ariaLabel='Ecommerce'>
        <SubNavHeader label='Ecommerce' />
        <SubNavSections style={{ 'margin-left': '-8px' }}>
            {
              links.map(link =>
                <SubNavLink
                  to={`/plugins/${pluginId}/${link.link}`}
                  key={link.id} icon={link.icon}
                >
                  {link.label}
                </SubNavLink>)
            }
        </SubNavSections>
      </SubNav>
    </nav>
  )
};

export default Navigation;
