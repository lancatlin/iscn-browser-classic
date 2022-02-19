import DataBinding from "./databinding.js";
import Observable from "./observable.js";
console.log("hello");

const ctx = {
  n1: new Observable("Hello, how are you"),
  n2: new Observable("I'm fine. Thank you."),
};
DataBinding.bindObservables(document, ctx);
setTimeout(() => {
  ctx.n1.update("Timeout!!");
}, 1000);

async function loadBlock() {
  const res = await axios.get('./partials/block.html');
  return res.data;
}

async function renderBlock() {
  const block = await loadBlock();
  const elem = document.createElement("div");
  elem.innerHTML = block;
  document.getElementById("block-list").appendChild(elem);
}

renderBlock();
