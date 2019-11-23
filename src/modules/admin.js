import { createElement } from './generate';

const rootNode = document.getElementById('root');

function renderAdminPage() {
  rootNode.innerHTML = '';

  let span = createElement('span', '', '', 'Admin page', rootNode);
  console.log(span);
  return span;
}

export { renderAdminPage };
