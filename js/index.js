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

async function loadBlocks() {
  const res = await axios.get(`https://mainnet-node.like.co/cosmos/tx/v1beta1/txs?pagination.limit=1&events=message.module='iscn'`)
  const content = res.data.tx_responses[0].tx.body.messages[0].record.contentMetadata
  console.log(content)
  document.getElementById('block-list').appendChild(await render("block", content));
}

loadBlocks();
