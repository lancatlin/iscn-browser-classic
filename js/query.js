const query = new URLSearchParams(window.location.href.split("?")[1]);
function getQuery(key) {
  return query.get(key);
}

export default getQuery;
