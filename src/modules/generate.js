const createElement = (tag, className, capture, parentNode) => {
  let element = document.createElement(tag);
  if (className) {
    element.className = className;
  }
  if (capture) {
    let t = document.createTextNode(capture);
    element.appendChild(t);
  }
  if (parentNode) {
    parentNode.appendChild(element);
  }
  return element;
};

export { createElement };
