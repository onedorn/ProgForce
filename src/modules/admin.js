import { createElement } from './generate';
import { Customer } from './customer';
import axios from 'axios';

const rootNode = document.getElementById('root');
const customer = new Customer();

class Admin {
  constructor() {
    this.goods = [];
  }

  getItemsFromDB() {
    axios
      .get('https://5dd81b65505c590014d3ba81.mockapi.io/api/store/item')
      .then(res => {
        this.goods = res.data;
      })
      .catch(err => console.log(err));
  }

  postNewItemToDB() {}
  editItemOnDB() {}
  deleteItemFromDB() {}

  renderHeader() {
    let header = createElement('header', 'container pt-3 pb-3', '', rootNode);
    let nav = createElement(
      'nav',
      'nav d-flex justify-content-between',
      '',
      header
    );
    let buttonAdmin = createElement(
      'button',
      'btn btn-secondary',
      'Admin',
      nav
    );
    let buttonClient = createElement(
      'button',
      'btn btn-primary',
      'Client',
      nav
    );
    buttonAdmin.addEventListener('click', setHashForCustomerPage);
    buttonClient.addEventListener('click', customer.renderCustomerPage);
  }

  renderTableHead() {
    this.getItemsFromDB();
    let div = createElement('div', 'container', '', rootNode);
    let table = createElement(
      'table',
      'table table-striped table-hover',
      '',
      div
    );
    let thead = createElement('thead', '', '', table);
    let tr = createElement('tr', '', '', thead);
    let th1 = createElement('th', '', 'Code', tr);
    let th2 = createElement('th', '', 'Name', tr);
    let th3 = createElement('th', '', 'Description', tr);
    let th4 = createElement('th', '', 'Price', tr);
    let th5 = createElement('th', '', 'Available', tr);
    let th6 = createElement('th', '', 'Image', tr);
    let th7 = createElement('th', '', 'Price', tr);

    let tbody = createElement('tbody', '', '', table);
    this.goods.map(item => {
      let tr2 = createElement('tr', '', '', tbody);
      let td1 = createElement('td', '', item.id, tr2);
      let td2 = createElement('td', '', item.name, tr2);
      let td3 = createElement('td', '', item.description, tr2);
      let td4 = createElement('td', '', item.price, tr2);
      let td5 = createElement(
        'td',
        '',
        item.available ? 'In stock' : 'Run out',
        tr2
      );
      let td6 = createElement('td', '', item.img, tr2);
      let td7 = createElement('td', '', item.actions, tr2);
    });
  }

  renderAdminPage() {
    rootNode.innerHTML = '';
    this.renderHeader();
    this.renderTableHead();
  }

  renderAdminPanel() {
    console.log('Admin panel');
  }
}

export { Admin };
