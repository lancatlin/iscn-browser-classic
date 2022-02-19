async function render(partial_name, context) {
  const block = await loadBlock(partial_name);
  const elem = document.createElement("div");
  elem.innerHTML = block;
  const attrBindings = elem.querySelectorAll("[data-bind]");
  attrBindings.forEach(elem => {
    bindAttribute(elem, contextValue(elem, context));
  });
  return elem;
}

function contextValue(elem, context) {
  const keys = elem.getAttribute("data-bind").split("|")
  for (const key of keys) {
    if (context[key]) {
      return context[key]
    }
  }
  return null
}

function bindAttribute(elem, value) {
  const attr = elem.getAttribute("data-attr")
  if (!value) {
    elem.hidden = true;
  }
  if (!attr) {
    elem.innerHTML = value;
  } else {
    elem[attr] = value;
  }
}

async function loadBlock(partial_name) {
  const res = await axios.get(`./partials/${partial_name}.html`);
  return res.data;
}


export default render;