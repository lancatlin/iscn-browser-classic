async function render(partial_name, context) {
  const block = await loadBlock(partial_name);
  const elem = document.createElement("div");
  elem.innerHTML = block;
  const dataBindings = elem.querySelectorAll("[data-bind]");
  dataBindings.forEach(elem => {
    bindValue(elem,
      context[elem.getAttribute("data-bind")]);
  });
  return elem;
}

function bindValue(elem, observable) {
  const initialValue = observable.value;
  elem.innerHTML = initialValue;
  observable.subscribe(() => elem.innerHTML = observable.value);
}

async function loadBlock(partial_name) {
  const res = await axios.get(`./partials/${partial_name}.html`);
  return res.data;
}


export default render;