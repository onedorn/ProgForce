import { createElement } from './modules/generate';
import axios from 'axios';
import './scss/main.scss';

const rootNode = document.getElementById('root');
let goods = [];
let cartItem = [];
let selectedItem = null;

/************************* HASHING URL *****************************/
const ADMIN_PANEL_URL = (location.hash = '#/admin/panel/');
const ADMIN_EDIT_PANEL_URL = (location.hash = '#/admin/edit/panel/');
const CUSTOMER_URL = (location.hash = '#/client/');
const ADMIN_URL = (location.hash = '#/admin/');

const setHashForAdminPage = () => {
  selectedItem = null;
  window.location.hash = ADMIN_URL;
};
const setHashForAdminPanelPage = () => (window.location.hash = ADMIN_PANEL_URL);
const setHashForAdminEditPanelPage = () => (window.location.hash = ADMIN_EDIT_PANEL_URL);
const setHashForCustomerPage = () => (window.location.hash = CUSTOMER_URL);

const renderPageOnHashChange = () => {
  if (location.hash === ADMIN_URL) return getItemsFromDB();
  if (location.hash === CUSTOMER_URL) return renderCustomerPage();
  if (location.hash === ADMIN_PANEL_URL) return renderAdminPanelPage();
  if (location.hash === ADMIN_EDIT_PANEL_URL) return renderAdminPanelPage();
};

window.addEventListener('load', renderPageOnHashChange);
window.addEventListener('hashchange', renderPageOnHashChange);

/***************************** CRUD API ******************************/
function getItemsFromDB() {
  axios
    .get('https://5dd81b65505c590014d3ba81.mockapi.io/api/store/item')
    .then(res => {
      rootNode.innerHTML = '';
      renderHeader();
      renderAddItemBtn();
      renderTableHead(res.data);
    })
    .catch(err => console.log(err));
}

function postNewItemToDB(item) {
  axios
    .post('https://5dd81b65505c590014d3ba81.mockapi.io/api/store/item', item)
    .then(res => console.log(res.data))
    .catch(err => console.log(err));
}

function editItemOnDB(id, item) {
  axios
    .put(
      `https://5dd81b65505c590014d3ba81.mockapi.io/api/store/item/${id}`,
      item
    )
    .then(res => console.log(res.data))
    .catch(err => console.log(err));
}

function deleteItemFromDB(id) {
  axios
    .delete(`https://5dd81b65505c590014d3ba81.mockapi.io/api/store/item/${id}`)
    .then(res => console.log(res.data))
    .catch(err => console.log(err));
}

/*************************** ADMIN PAGE COMPONENTS **************************/
function renderHeader() {
  let header = createElement('header', 'container pt-3 pb-3', '', rootNode);
  let nav = createElement('nav', 'nav d-flex justify-content-between', '', header);
  let buttonAdmin = createElement('button', 'btn btn-secondary', 'Admin', nav);
  let buttonClient = createElement('button', 'btn btn-primary', 'Client', nav);
  buttonAdmin.addEventListener('click', setHashForAdminPage);
  buttonClient.addEventListener('click', setHashForCustomerPage);
}

function renderAddItemBtn() {
  let div = createElement('div', 'container', '', rootNode);
  let buttonAddItem = createElement('button', 'btn btn-outline-danger float-right mt-2 mb-4', '', div);
  buttonAddItem.addEventListener('click', setHashForAdminPanelPage);
  let addItemIcon = createElement('i', 'fas fa-plus', '', buttonAddItem);
}

function renderTableHead(goods) {
  let div = createElement('div', 'container', '', rootNode);
  let table = createElement('table', 'table table-striped table-hover', '', div);
  let thead = createElement('thead', '', '', table);
  let tr = createElement('tr', '', '', thead);
  let th1 = createElement('th', '', 'Code', tr);
  let th2 = createElement('th', '', 'Name', tr);
  let th3 = createElement('th', '', 'Description', tr);
  let th4 = createElement('th', '', 'Price', tr);
  let th5 = createElement('th', '', 'Available', tr);
  let th6 = createElement('th', '', 'Image', tr);
  let th7 = createElement('th', '', 'Actions', tr);
  let tbody = createElement('tbody', '', '', table);
  goods.map(item => {
    let tr2 = createElement('tr', '', '', tbody);
    let td1 = createElement('td', '', item.code, tr2);
    let td2 = createElement('td', '', item.name, tr2);
    let td3 = createElement('td', '', item.description, tr2);
    let td4 = createElement('td', '', `${item.price} uah`, tr2);
    let td5 = createElement('td', '', item.available ? 'in stock' : 'run out', tr2);
    let td6 = createElement('td', '', '', tr2);
    let img = createElement('i', `${item.img} ml-2 text-danger`, '', td6);
    let td7 = createElement('td', '', '', tr2);
    let deleteIcon = createElement('i', 'fas fa-trash text-dark', '', td7);
    let cartIcon = createElement('i', 'fas fa-cart-arrow-down text-primary ml-2 mr-2', '', td7);
    let editIcon = createElement('i', 'fas fa-edit text-secondary', '', td7);

    deleteIcon.addEventListener('click', () => {
      deleteItemFromDB(item.id);
      tr2.remove();
    });

    editIcon.addEventListener('click', () => {
      selectedItem = item;
      setHashForAdminEditPanelPage();
    });

    cartIcon.addEventListener('click', () => {
      cartItem.push(item);
      console.log(cartItem);
    })
  });

  if (!goods.length) {
    let alert = createElement( 'p',
      'container text-center bg-light border p-2',
      "Currently you don't have any of the item available in the store.", rootNode);
    let warn = createElement('i', 'fas fa-exclamation-circle ml-2', '', alert);
  }
}

function renderAdminPanelPage() {
  rootNode.innerHTML = '';
  renderHeader();

  let form = createElement('form', 'container mt-5', '', rootNode);
  let div1 = createElement('div', 'mb-3', '', form);
  let label1 = createElement('label', '', 'Code', div1);
  label1.setAttribute('for', 'validationServer01');
  let input1 = createElement('input', 'form-control', '', div1);
  selectedItem 
    ? (input1.value = selectedItem.code) 
    : (input1.value = '');
  input1.setAttribute('type', 'text');
  input1.id = 'validationServer01';
  input1.setAttribute('placeholder', 'Code');
  input1.setAttribute('required', '');

  let div2 = createElement('div', 'mb-3', '', form);
  let label2 = createElement('label', '', 'Name', div2);
  label2.setAttribute('for', 'validationServer02');
  let input2 = createElement('input', 'form-control', '', div2);
  selectedItem 
    ? (input2.value = selectedItem.name) 
    : (input2.value = '');
  input2.setAttribute('type', 'text');
  input2.setAttribute('placeholder', 'Name');
  input2.setAttribute('required', '');
  input2.id = 'validationServer02';

  let div3 = createElement('div', 'mb-3', '', form);
  let label3 = createElement('label', '', 'Price', div3);
  label3.setAttribute('for', 'validationServer03');
  let input3 = createElement('input', 'form-control', '', div3);
  selectedItem 
    ? (input3.value = selectedItem.price) 
    : (input3.value = '');
  input3.setAttribute('type', 'text');
  input3.setAttribute('placeholder', 'Price');
  input3.setAttribute('required', '');
  input3.id = 'validationServer03';

  let div4 = createElement('div', 'mb-3', '', form);
  let label4 = createElement('label', '', 'Image', div4);
  label4.setAttribute('for', 'validationServer04');
  let input4 = createElement('input', 'form-control', '', div4);
  selectedItem 
    ? (input4.value = selectedItem.img) 
    : (input4.value = '');
  input4.setAttribute('type', 'text');
  input4.setAttribute('placeholder', 'Font awesome class');
  input4.setAttribute('required', '');
  input4.id = 'validationServer04';

  let div5 = createElement('div', 'mb-3', '', form);
  let label5 = createElement('label', '', 'Available', div5);
  label5.setAttribute('for', 'validationServer05');
  let input5 = createElement('input', 'ml-3', '', div5);
  selectedItem
    ? (input5.checked = selectedItem.available)
    : (input5.value = '');
  input5.setAttribute('type', 'checkbox');
  input5.setAttribute('required', '');
  input5.id = 'validationServer05';

  let div = createElement('div', 'mb-3', '', form);
  let label = createElement('label', '', 'Description', div);
  label.setAttribute('for', 'validationTextarea');
  let textarea = createElement('textarea', 'form-control', '', div);
  selectedItem
    ? (textarea.value = selectedItem.description)
    : (textarea.value = '');
  textarea.id = 'validationTextarea';
  textarea.setAttribute('placeholder', 'Write description of the item');
  textarea.setAttribute('required', '');

  let saveBtn = createElement('button', 'btn btn-primary', 'Save', form);
  let editBtn = createElement('button', 'btn btn-primary', 'Edit', form);

  if ('#/admin/edit/panel/' === window.location.hash) {
    editBtn.style.display = 'block';
    saveBtn.style.display = 'none';
  } else {
    editBtn.style.display = 'none';
    saveBtn.style.display = 'block';
  }

  saveBtn.addEventListener('click', () => {
    const item = {
      code: input1.value,
      name: input2.value,
      price: input3.value,
      img: input4.value,
      available: input5.checked,
      description: textarea.value
    };
    postNewItemToDB(item);
    setHashForAdminPage();
  });

  editBtn.addEventListener('click', () => {
    const edited = {
      code: input1.value,
      name: input2.value,
      price: input3.value,
      img: input4.value,
      available: input5.checked,
      description: textarea.value
    };
    editItemOnDB(selectedItem.id, edited);
    setHashForAdminPage();
  });
}

/*************************** CLIENT PAGE COMPONENTS **************************/
function renderCustomerPage() {
  rootNode.innerHTML = '';
  renderHeader();
  renderCustomerPageBasket();
}

function renderCustomerPageBasket () {
  let totalPrice = cartItem.map(i => i.price).reduce((a, c) => +a + +c, 0);
  
  let div = createElement('div', 'container cart-btn text-center', '', rootNode)
  let btn = createElement('button', 'btn btn-outline-dark mb-3 pl-5 pr-5', `${totalPrice} uah`, div);
  let cart = createElement('i', 'fas fa-shopping-cart ml-3', '', btn)
  
  cartItem.map(cart => {
    let purchase = createElement('div', 'container border-secondary card w-50 mb-2', '', rootNode);
    let card = createElement('div', 'card-body', '', purchase);
    let row = createElement('div', 'row', '', card);
    let col = createElement('col', 'col-4 card-section', '', row);
    let img = createElement('i', `${cart.img} text-danger cart-item`, '', col);
    let col2 = createElement('div', 'col-4 card-section', '', row);
    let desc = createElement('p', 'font-weight-bold text-uppercase', `${cart.description}`, col2)
    let col3 = createElement('div', 'col-4 card-section', '', row);
    let span = createElement('span', 'font-weight-bold', `${cart.price} uah`, col3)
  })
}
