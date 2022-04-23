import render from "./render.js"
import { ENDPOINT, api } from "./config.js"

async function loadBlocks() {
  const queryString = window.location.href.split("?")[1];
  const res = await api.get(`/iscn/records?limit=12&${queryString}`)
  const records = res.data.records
  for (const record of records) {
    console.log(record);
    const { data } = record;
    const datetime = new Date(data.recordTimestamp);
    const datetime_string = datetime.toLocaleString();
    const iscn = `detail.html?iscn=${data['@id']}`;
    const content = data.contentMetadata;
    document.getElementById('block-list').appendChild(await render("block", {
      iscn,
      timestamp: datetime_string,
      ...content,
    }));
  }
}

loadBlocks();
