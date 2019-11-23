import { renderAdminPage } from './modules/admin';
import { renderCustomerPage } from './modules/customer';
import { renderBasketPage } from './modules/basket';
import './scss/main.scss';

/************************* HASHING URL *****************************/
const ADMIN_URL = (location.hash = '#/admin/');
const BASKET_URL = (location.hash = '#/basket/');
const CUSTOMER_URL = (location.hash = '#/');

const setHashForAdminPage = () => (window.location.hash = ADMIN_URL);
const setHashForBasketPage = () => (window.location.hash = BASKET_URL);
const setHashForCustomerPage = () => (window.location.hash = CUSTOMER_URL);

const renderPageOnHashChange = () => {
  if (location.hash === ADMIN_URL) return renderAdminPage();
  if (location.hash === CUSTOMER_URL) return renderCustomerPage();
  if (location.hash === BASKET_URL) return renderBasketPage();
};

window.addEventListener('load', renderPageOnHashChange);
