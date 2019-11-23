import { createElement } from './generate';

const rootNode = document.getElementById('root');

function renderCustomerPage() {
  rootNode.innerHTML = '';
  const el = createElement('h1', 'captain', 'header', 'Header from customer page', rootNode);
  console.log(el);
  return el;
}

export { renderCustomerPage };
