import { Admin } from './modules/admin';
import { Customer } from './modules/customer';
import { Basket } from './modules/basket';

import './scss/main.scss';

const admin = new Admin();
const customer = new Customer();
const basket = new Basket();

const ADMIN_URL = (location.hash = '#/admin/');
const BASKET_URL = (location.hash = '#/basket/');
const CUSTOMER_URL = (location.hash = '#/client');

const setHashForAdminPage = () => (window.location.hash = ADMIN_URL);
const setHashForBasketPage = () => (window.location.hash = BASKET_URL);
const setHashForCustomerPage = () => (window.location.hash = CUSTOMER_URL);

const renderPageOnHashChange = () => {
  if (location.hash === ADMIN_URL) return admin.renderAdminPage();
  if (location.hash === CUSTOMER_URL) return customer.renderCustomerPage();
  if (location.hash === BASKET_URL) return basket.renderBasketPage();
};

setHashForAdminPage();

window.addEventListener('load', renderPageOnHashChange);
