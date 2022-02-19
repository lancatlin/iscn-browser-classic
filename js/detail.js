import render from "./render.js";
import getQuery from "./query.js";

async function loadRecord() {
    const iscn = getQuery("iscn");
    const res = await axios.get(`https://mainnet-node.like.co/iscn/records/id?iscn_id=${iscn}`)
    console.log(res.data);
    const { owner, records } = res.data;
    const record = records[records.length-1]
    const content = record.data.contentMetadata;
    console.log(content)
    const { name } = content;
    document.title = name;

    const ipfs = `https://cloudflare-ipfs.com/ipfs/${record.data.contentFingerprints[0].split("//")[1]}`
    // const ipfs = record.data.contentFingerprints[0]
    console.log(ipfs)
    const ctx = {
        ...content,
        owner,
        iscn,
        ipfs,
    }
    document.getElementById("detail").replaceChildren(await render("detail", ctx));
}

loadRecord();