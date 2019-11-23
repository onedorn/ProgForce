import { createElement } from './generate';

const rootNode = document.getElementById('root');

class Customer {
  constructor() {}
  renderCustomerPage() {
    rootNode.innerHTML = '';
  }
}

export { Customer };
