import { createElement } from './generate';
import { Admin } from './admin';

const rootNode = document.getElementById('root');

class Customer {
  constructor() {}
  renderCustomerPage() {
    // rootNode.innerHTML = '';
    console.log('Render customer page');
  }
}

export { Customer };
