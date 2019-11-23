import { createElement } from './generate';

const rootNode = document.getElementById('root');

class Basket {
  constructor() {}
  renderBasketPage() {
    rootNode.innerHTML = '';
  }
}

export { Basket };
