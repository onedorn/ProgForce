import { createElement } from './modules/generate';
import axios from 'axios';
import './scss/main.scss';

const rootNode = document.getElementById('root');
let goods = [];






/************************* HASHING URL *****************************/
const ADMIN_PANEL_URL = (location.hash = '#/admin/panel/');
const CUSTOMER_URL = (location.hash = '#/client/');
const ADMIN_URL = (location.hash = '#/admin/');

const setHashForAdminPage = () => (window.location.hash = ADMIN_URL);
const setHashForAdminPanelPage = () => (window.location.hash = ADMIN_PANEL_URL);
const setHashForCustomerPage = () => (window.location.hash = CUSTOMER_URL);

const renderPageOnHashChange = () => {
  if (location.hash === ADMIN_URL) return renderAdminPage();
  if (location.hash === CUSTOMER_URL) return renderCustomerPage();
  if (location.hash === ADMIN_PANEL_URL) return renderAdminPanelPage();
};

window.addEventListener('load', renderPageOnHashChange);
window.addEventListener('hashchange', renderPageOnHashChange);




/***************************** REST API ******************************/
function getItemsFromDB() {
  axios
    .get('https://5dd81b65505c590014d3ba81.mockapi.io/api/store/item')
    .then(res => {
      goods = res.data
    })
    .catch(err => console.log(err));
}
getItemsFromDB();

function postNewItemToDB() {}
function editItemOnDB() {}
function deleteItemFromDB() {}





/*************************** RENDER ADMIN PAGE **************************/
function renderAdminPage() {
  rootNode.innerHTML = '';
  renderHeader();
  renderTableHead();
}

function renderHeader() {
  let header = createElement('header', 'container pt-3 pb-3', '', rootNode);
  let nav = createElement('nav', 'nav d-flex justify-content-between', '', header);
  let buttonAdmin = createElement('button', 'btn btn-secondary', 'Admin', nav);
  let buttonClient = createElement('button', 'btn btn-primary', 'Client', nav);
  let buttonAddItem = createElement('button', 'btn btn-outline-danger float-right mt-3 mb-3', 'Add+', header )

  buttonAdmin.addEventListener('click', setHashForAdminPage);
  buttonClient.addEventListener('click', setHashForCustomerPage);
  buttonAddItem.addEventListener('click', setHashForAdminPanelPage);
}

function renderTableHead() {
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
  let th7 = createElement('th', '', 'Price', tr);
  let tbody = createElement('tbody', '', '', table);

  goods.map(item => {
    console.log(item);
    let tr2 = createElement('tr', '', '', tbody);
    let td1 = createElement('td', '', item.id, tr2);
    let td2 = createElement('td', '', item.name, tr2);
    let td3 = createElement('td', '', item.description, tr2);
    let td4 = createElement('td', '', `${item.price} uah`, tr2);
    let td5 = createElement('td', '', item.available ? 'In stock' : 'Run out', tr2);
    let td6 = createElement('td', '', item.img, tr2);
    let td7 = createElement('td', '', item.actions, tr2);
  });
}

function renderAdminPanelPage() {
  rootNode.innerHTML = '';
  renderHeader();
  let form = createElement('form', 'container mt-5', '', rootNode);

  let div1 = createElement('div', 'mb-3', '', form)
  let label1 = createElement('label', '', 'Code', div1)
  label1.setAttribute('for', 'validationServer01')
  let input1 = createElement('input', 'form-control', '', div1);
  input1.setAttribute('type', 'text')
  input1.id = 'validationServer01';
  input1.setAttribute('placeholder', 'Code')  
  input1.setAttribute('required', '')
  
  let div2 = createElement('div', 'mb-3', '', form)
  let label2 = createElement('label', '', 'Name', div2)
  label2.setAttribute('for', 'validationServer02')
  let input2 = createElement('input', 'form-control', '', div2)
  input2.setAttribute('type', 'text')
  input2.setAttribute('placeholder', 'Name')  
  input2.setAttribute('required', '')
  input2.id = 'validationServer02';
  
  let div3 = createElement('div', 'mb-3', '', form)
  let label3 = createElement('label', '', 'Price', div3)
  label3.setAttribute('for', 'validationServer03' )
  let input3 = createElement('input', 'form-control', '', div3)
  input3.setAttribute('type', 'text')
  input3.setAttribute('placeholder', 'Price')  
  input3.setAttribute('required', '')
  input3.id = 'validationServer03';
  
  let div4 = createElement('div', 'mb-3', '', form)
  let label4 = createElement('label', '', 'Image', div4)
  label4.setAttribute('for', 'validationServer04')
  let input4 = createElement('input', 'form-control', '', div4)
  input4.setAttribute('type', 'text')
  input4.setAttribute('placeholder', 'Image')  
  input4.setAttribute('required', '')
  input4.id = 'validationServer04';
  
  let div5 = createElement('div', 'mb-3', '', form)
  let label5 = createElement('label', '', 'Available', div5)
  label5.setAttribute('for', 'validationServer05')
  let input5 = createElement('input', 'ml-3', '', div5)
  input5.setAttribute('type', 'checkbox')
  input5.setAttribute('required', '')
  input5.id = 'validationServer05';

  let div = createElement('div', 'mb-3', '', form);
  let label = createElement('label', '', 'Description', div)
  label.setAttribute('for', 'validationTextarea');
  let textarea = createElement('textarea', 'form-control', '', div);
  textarea.id = 'validationTextarea';
  textarea.setAttribute('placeholder', 'Write description of the item')
  textarea.setAttribute('required', '');

  let saveBtn = createElement('button', 'btn btn-primary', 'Save', form)
}

function renderCustomerPage() {
  rootNode.innerHTML = '';
  renderHeader();
}
