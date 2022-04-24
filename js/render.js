function render(partial_name, context) {
  const elem = loadBlock(partial_name);
  const attrBindings = elem.querySelectorAll("[data-bind]");
  attrBindings.forEach((elem) => {
    bindAttribute(elem, contextValue(elem, context));
  });
  return elem;
}

function contextValue(elem, context) {
  const keys = elem.getAttribute("data-bind").split("|");
  for (const key of keys) {
    if (context[key]) {
      return context[key];
    }
  }
  return null;
}

function bindAttribute(elem, value) {
  const attr = elem.getAttribute("data-attr");
  if (!value) {
    elem.hidden = true;
  }
  if (!attr) {
    elem.innerHTML = value;
  } else {
    elem[attr] = value;
  }
}

function loadBlock(id) {
  const elem = document.querySelector(`template#${id}`);
  console.log(elem);
  return elem.content.cloneNode(true);
}

export default render;
