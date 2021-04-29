export function moveSearchToHash(href = window.location.href) {
  let urlObject = new URL(href);
  let hash = urlObject.hash;
  let search = urlObject.search;
  let strippedSearch = search.substring(1, search.length);
  if (!hash) {
    hash = "#";
  }
  let url = href.slice(0, href.indexOf(search)) + hash;
  if (strippedSearch) {
    if (hash.indexOf("?") >= 0) {
      url += `&${strippedSearch}`;
    } else {
      url += `?${strippedSearch}`;
    }
  }
  return url;
}
