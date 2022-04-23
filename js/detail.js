import render from "./render.js";
import getQuery from "./query.js";
import { api } from "./config.js";

async function loadRecord() {
  const iscn = getQuery("iscn");
  const res = await api.get(`/iscn/records?iscn_id=${iscn}`)
  console.log(res.data);
  const { records } = res.data;
  const record = records[0]

  const { owner, contentMetadata } = record.data;
  console.log(contentMetadata)
  const { name } = contentMetadata;
  document.title = name;

  // const ipfs = `https://cloudflare-ipfs.com/ipfs/${record.data.contentFingerprints[0].split("//")[1]}`
  // const ipfs = record.data.contentFingerprints[0]
  // console.log(ipfs)
  const ctx = {
    ...contentMetadata,
    owner,
    iscn,
  }
  document.getElementById("detail").replaceChildren(await render("detail", ctx));
}

loadRecord();
