import render from "./render.js";

async function loadBlocks() {
  const res = await axios.get(`https://mainnet-node.like.co/cosmos/tx/v1beta1/txs?pagination.limit=12&events=message.module='iscn'`)
  const records = res.data.tx_responses;
  console.log(records)
  for (const record of records) {
    console.log(record);
    const { timestamp } = record;
    const datetime = new Date(timestamp);
    const datetime_string = datetime.toLocaleString();
    const iscn = `detail.html?iscn=${record.logs[0].events[0].attributes[0].value}`;
    console.log(iscn);
    const content = record.tx.body.messages[0].record.contentMetadata;
    document.getElementById('block-list').appendChild(await render("block", {
      iscn,
      timestamp: datetime_string,
      ...content,
    }));
  }
}

loadBlocks();
