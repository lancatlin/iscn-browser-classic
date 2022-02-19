import render from "./render.js";
import getQuery from "./query.js";

async function loadRecord() {
    const iscn = getQuery("iscn");
    const res = await axios.get(`https://mainnet-node.like.co/iscn/records/id?iscn_id=${iscn}`)
    console.log(res.data);
    const { owner, records } = res.data;
    const content = records[records.length-1].data.contentMetadata;
    console.log(content)
    const { name, description } = content;
    const ctx = {
        ...content,
        owner,
    }
    document.getElementById("detail").replaceChildren(await render("detail", ctx));
}

loadRecord();