async function render(partial_name, context) {
  const block = await loadBlock(partial_name);
  const elem = document.createElement("div");
  elem.innerHTML = block;
  const dataBindings = elem.querySelectorAll("[data-bind]");
  dataBindings.forEach(elem => {
    bindValue(elem, contextValue(elem, context));
  });
  const attrBindings = elem.querySelectorAll("[data-attr]");
  attrBindings.forEach(elem => {
    bindAttribute(elem, context[elem.getAttribute("data-value")]);
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
  return "No data"
}

function bindValue(elem, value) {
  elem.innerHTML = value;
  // observable.subscribe(() => elem.innerHTML = observable.value);
}

function bindAttribute(elem, value) {
  const attr = elem.getAttribute("data-attr")
  elem[attr] = value;
}

async function loadBlock(partial_name) {
  const res = await axios.get(`./partials/${partial_name}.html`);
  return res.data;
}


export default render;