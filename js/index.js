import DataBinding from "./databinding.js";
import Observable from "./observable.js";
import render from "./render.js";
console.log("hello");

const ctx = {
  n1: new Observable("Hello, how are you"),
  n2: new Observable("I'm fine. Thank you."),
};
DataBinding.bindObservables(document, ctx);
setTimeout(() => {
  ctx.n1.update("Timeout!!");
}, 1000);

async function test() {
  const ctx = {
    title: new Observable("This is a title!"),
    description: new Observable("This is the description."),
  };
  document.getElementById('block-list').appendChild(await render("block", ctx));
  setTimeout(() => ctx.description.update("Timeout"), 1000)
}

test();
