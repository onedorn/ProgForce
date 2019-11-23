import { createElement } from './generate';

const rootNode = document.getElementById('root');

function renderBasketPage () {
    return rootNode.innerHTML = 'Hello from Basket page'
}

export {renderBasketPage}