import render from "./render.js";
import getQuery from "./query.js";
import { api } from "./config.js";

function fingerprintLink(fingerprint) {
  const [schema, value] = fingerprint.split("://");
  switch (schema) {
    case "ipfs":
      return `https://cloudflare-ipfs.com/ipfs/${value}`;

    case "ar":
      return `https://arweave.net/${value}`;

    default:
      return `./?fingerprint=${fingerprint}`;
  }
}

async function loadRecord() {
  const iscn = getQuery("iscn");
  const res = await api.get(`/iscn/records?iscn_id=${iscn}`);
  console.log(res.data);
  const { records } = res.data;
  const record = records[0];

  const {
    owner,
    contentMetadata,
    contentFingerprints,
    recordTimestamp,
    stakeholders,
  } = record.data;
  console.log(contentMetadata);
  const { name, keywords } = contentMetadata;
  document.title = name;

  const keywordList = keywords.split(",").map((k) =>
    render("keyword", {
      keyword: k,
      link: `./?keywords=${k}`,
    })
  );

  const fingerprintList = contentFingerprints
    ? contentFingerprints.map((v) =>
        render("fingerprint", {
          fingerprint: v,
          link: fingerprintLink(v),
        })
      )
    : null;

  console.log(stakeholders);
  const stakeholderList = stakeholders.map(({ entity }) =>
    render("stakeholder", {
      ...entity,
      link: `./?stakeholders.entity.name=${entity.name}`,
    })
  );

  const ctx = {
    ...contentMetadata,
    owner,
    recordTimestamp,
    owner_link: `./?owner=${owner}`,
    iscn,
    iscn_link: `https://app.like.co/view/${encodeURIComponent(iscn)}`,
    keywords: keywords == "" ? null : keywordList,
    contentFingerprints: fingerprintList,
    stakeholders: stakeholderList,
  };
  render("detail", ctx, false);
}

loadRecord();
