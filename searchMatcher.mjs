const hasParam = (url, name) => url.searchParams.has(name) && url.searchParams.get(name) !== "";

const endsWithAny = (value, suffixes) => suffixes.some((suffix) => value === suffix || value.endsWith(`.${suffix}`));

const isGoogleSearchHost = (hostname) => {
  const normalizedHostname = hostname.toLowerCase();
  if (normalizedHostname === "google.com" || normalizedHostname === "www.google.com") return true;

  const googleHostname = normalizedHostname.startsWith("www.")
    ? normalizedHostname.slice(4)
    : normalizedHostname;

  return googleHostname.startsWith("google.") && googleHostname.length > "google.".length;
};

const isDuckDuckGoSearchURL = (url) => {
  if (url.hostname === "duckduckgo.com" && url.pathname === "/" && hasParam(url, "q")) return true;

  const duckDuckGoAlternatePaths = {
    "html.duckduckgo.com": "/html/",
    "lite.duckduckgo.com": "/lite/",
  };
  return duckDuckGoAlternatePaths[url.hostname] === url.pathname && hasParam(url, "q");
};

const SEARCH_MATCHERS = [
  (url) => isGoogleSearchHost(url.hostname) && url.pathname === "/search" && hasParam(url, "q"),
  isDuckDuckGoSearchURL,
  (url) => endsWithAny(url.hostname, ["bing.com"]) && url.pathname === "/search" && hasParam(url, "q"),
  (url) => url.hostname === "search.yahoo.com" && url.pathname === "/search" && hasParam(url, "p"),
  (url) => url.hostname === "search.brave.com" && url.pathname === "/search" && hasParam(url, "q"),
  (url) => endsWithAny(url.hostname, ["ecosia.org"]) && url.pathname === "/search" && hasParam(url, "q"),
  (url) => endsWithAny(url.hostname, ["startpage.com"]) && url.pathname.includes("search") && hasParam(url, "query"),
  (url) => url.hostname === "kagi.com" && url.pathname === "/search" && hasParam(url, "q"),
  (url) => endsWithAny(url.hostname, ["yandex.com"]) && url.pathname.startsWith("/search") && hasParam(url, "text"),
  (url) => endsWithAny(url.hostname, ["perplexity.ai"]) && url.pathname.startsWith("/search"),
  (url) => url.hostname === "you.com" && url.pathname === "/search" && hasParam(url, "q"),
  (url) => endsWithAny(url.hostname, ["swisscows.com"]) && url.pathname === "/web" && hasParam(url, "query"),
  (url) => url.hostname === "search.aol.com" && url.pathname.includes("/search") && hasParam(url, "q"),
  (url) => endsWithAny(url.hostname, ["baidu.com"]) && url.pathname === "/s" && hasParam(url, "wd"),
  (url) => endsWithAny(url.hostname, ["qwant.com"]) && url.pathname === "/" && hasParam(url, "q"),
];

export function isSearchURL(rawURL) {
  if (!rawURL) return false;

  let parsedURL;
  try {
    parsedURL = new URL(rawURL);
  } catch {
    return false;
  }

  return SEARCH_MATCHERS.some((matcher) => matcher(parsedURL));
}

export function isSearchTab(tab) {
  return Boolean(tab?.url) && isSearchURL(tab.url);
}
