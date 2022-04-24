import render from "./render.js";
import { ENDPOINT, api } from "./config.js";

const tags = ["LikeCoin", "香港", "Cosmos"];

function tagList() {
  document.getElementById("tags").innerHTML = tags
    .map(
      (tag) => `
  <li><a href="./?keywords=${tag}">${tag}</a></li>
  `
    )
    .join("");
}

async function loadBlocks() {
  const queryString = window.location.href.split("?")[1];
  try {
    const res = await api.get(
      `/iscn/records?limit=12${queryString ? "&" + queryString : ""}`
    );
    const records = res.data.records;
    document.getElementById("block-list").replaceChildren();
    for (const record of records) {
      console.log(record);
      const { data } = record;
      const datetime = new Date(data.recordTimestamp);
      const datetime_string = datetime.toLocaleString();
      const iscn = `detail.html?iscn=${data["@id"]}`;
      const content = data.contentMetadata;
      document.getElementById("block-list").appendChild(
        render("block", {
          iscn,
          timestamp: datetime_string,
          ...content,
          tags: tagList(tags),
        })
      );
    }
  } catch (err) {
    console.log(err);
    if (err.response.status == 404) {
      document.getElementById("block-list").innerHTML =
        "Cannot find any records";
    } else {
      document.getElementById("block-list").innerHTML = err.message;
    }
  }
}

tagList();
loadBlocks();
