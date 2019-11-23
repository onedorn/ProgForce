import axios from 'axios';
import { createElement } from './generate';

const rootNode = document.getElementById('root');

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
  renderHeader() {}

  renderAdminPage() {
    rootNode.innerHTML = '';
    this.goods.map(item => {
      let li = document.createElement('li')
      let t = document.createTextNode("Hello World")
      li.appendChild(t)
      rootNode.appendChild(li)
    });
  }
}

export { Admin };
