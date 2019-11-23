const createElement = (tag, idName, className, capture, parent) => {

  let element = document.createElement(tag);
  if (idName) element.id = idName;
  if (className) element.className = className;
  if (capture) element.innerHTML = capture;
  if (parent) parent.appendChild(element);
  
  return element;
};

export { createElement };
