import React from 'react';
import styled from 'styled-components';

import Dashboard from './Icons/Dashboard';
import Products from './Icons/Products';
import Categories from './Icons/Categories';
import Customers from './Icons/Customers';
import Orders from './Icons/Orders';
import Settings from './Icons/Settings';
import Manufacturer from './Icons/Manufacturer';

import getTrad from '../../utils/getTrad';
import { FormattedMessage } from 'react-intl';

import {
  SubNav,
  SubNavHeader,
  SubNavLink,
  SubNavSections,
} from '@strapi/design-system/SubNav';

const SubNavHeaderStyled = styled.div`
  padding: 24px 16px 8px 24px;
  div:first-child {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    h2 {
      display: block;
      position: relative;
      color: #32324d;
      font-weight: 600;
      font-size: 1.125rem;
      line-height: 1.22;
    }
    h2:first-child::after {
      content: '${props => props.stage}';
      position: absolute;
      top: -21%;
      left: 90px;
      background-color: ${props => props.backgroundColor};
      font-family: 'Segoe UI', 'Open Sans', Helvetica, sans-serif;
      font-weight: 400;
      color: #FFF;
      font-size: 10px;
      letter-spacing: 0.4px;
      padding: 2px 7.5px;
      border-radius: 2px;
    }
  }

  div:nth-child(2) {
    padding-top: 16px;
    hr {
      display: block;
      overflow: hidden;
      width: 1.5rem;
      background-color: #dcdce4;
      height: 1.5px;
      border: none;
      margin: 0;
    }
  }
`;


const Navigation = () => {
  const stage = 'alpha';
  let backgroundColor;
  switch (stage) {
    case 'pro':
      backgroundColor = '#5668A9';
      break;
    case 'enterprise':
      backgroundColor = '#000000';
      break;
    default:
      backgroundColor = '#56A977';
  }

  const links = [
    { id: 1, label: getTrad('dashboard.title'), link: 'dashboard', icon: <Dashboard /> },
    { id: 2, label: getTrad('products.title'), link: 'products', icon: <Products /> },
    { id: 3, label: getTrad('categories.title'), link: 'categories', icon: <Categories /> },
    { id: 4, label: getTrad('manufacturers.title'), link: 'manufacturers', icon: <Manufacturer /> },
    { id: 5, label: getTrad('customers.title'), link: 'customers', icon: <Customers /> },
    { id: 6, label: getTrad('orders.title'), link: 'orders', icon: <Orders /> },
    { id: 7, label: getTrad('settings.title'), link: 'settings', icon: <Settings /> },
  ];

  return (
    <SubNav ariaLabel='Ecommerce'>
      {/*<SubNavHeader label='Ecommerce' />*/}
      <SubNavHeaderStyled backgroundColor={backgroundColor} stage={stage}>
        <div>
          <h2>Ecommerce</h2>
        </div>
        <div>
          <hr/>
        </div>
      </SubNavHeaderStyled>
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
  );
};

export default Navigation;
