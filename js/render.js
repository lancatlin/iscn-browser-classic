function render(partial_name, context, create = true) {
  const elem = loadBlock(partial_name, create);
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
  } else if (attr == "list" && value) {
    elem.replaceChildren(...value);
  } else {
    elem[attr] = value;
  }
}

function loadBlock(id, create) {
  const elem = document.getElementById(id);
  return create ? elem.content.cloneNode(true) : elem;
}

export default render;
