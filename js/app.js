import DataBinding from "./databinding.js";
import Observable from "./observable.js";
console.log("hello");

const ctx = {
  n1: new Observable("Hello, how are you"),
};
DataBinding.bindObservables(document, ctx);
setTimeout(() => {
  console.log("time out");
  ctx.n1.update("Timeout!!");
}, 1000);
