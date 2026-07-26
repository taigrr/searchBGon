const hasParam = (url, name) => url.searchParams.has(name) && url.searchParams.get(name) !== "";

const endsWithAny = (value, suffixes) => suffixes.some((suffix) => value === suffix || value.endsWith(`.${suffix}`));

const GOOGLE_TLDS = new Set([
  "com", "ac", "ad", "ae", "com.af", "com.ag", "al", "am", "co.ao", "com.ar",
  "as", "at", "com.au", "az", "ba", "com.bd", "be", "bf", "bg", "com.bh",
  "bi", "bj", "com.bn", "com.bo", "com.br", "bs", "bt", "co.bw", "by",
  "com.bz", "ca", "cd", "cf", "cg", "ch", "ci", "co.ck", "cl", "cm", "cn",
  "com.co", "co.cr", "com.cu", "cv", "com.cy", "cz", "de", "dj", "dk", "dm",
  "com.do", "dz", "com.ec", "ee", "com.eg", "es", "com.et", "fi", "com.fj",
  "fm", "fr", "ga", "ge", "gg", "com.gh", "com.gi", "gl", "gm", "gp", "gr",
  "com.gt", "gy", "com.hk", "hn", "hr", "ht", "hu", "co.id", "ie", "co.il",
  "im", "co.in", "iq", "is", "it", "je", "com.jm", "jo", "co.jp", "co.ke",
  "com.kh", "ki", "kg", "co.kr", "com.kw", "kz", "la", "com.lb", "li", "lk",
  "co.ls", "lt", "lu", "lv", "com.ly", "co.ma", "md", "me", "mg", "mk", "ml",
  "com.mm", "mn", "ms", "com.mt", "mu", "mv", "mw", "com.mx", "com.my",
  "co.mz", "com.na", "com.nf", "com.ng", "com.ni", "ne", "nl", "no", "com.np",
  "nr", "nu", "co.nz", "com.om", "com.pa", "com.pe", "com.pg", "com.ph",
  "com.pk", "pl", "pn", "com.pr", "ps", "pt", "com.py", "com.qa", "ro", "ru",
  "rw", "com.sa", "com.sb", "sc", "se", "com.sg", "sh", "si", "sk", "com.sl",
  "sn", "so", "sm", "sr", "st", "com.sv", "td", "tg", "co.th", "com.tj", "tl",
  "tm", "tn", "to", "com.tr", "tt", "com.tw", "co.tz", "com.ua", "co.ug",
  "co.uk", "com.uy", "co.uz", "com.vc", "co.ve", "vg", "co.vi", "com.vn",
  "vu", "ws", "rs", "co.za", "co.zm", "co.zw", "cat",
]);

const isGoogleSearchHost = (hostname) => {
  const normalizedHostname = hostname.toLowerCase();
  const googleHostname = normalizedHostname.startsWith("www.")
    ? normalizedHostname.slice(4)
    : normalizedHostname;

  if (!googleHostname.startsWith("google.")) return false;
  return GOOGLE_TLDS.has(googleHostname.slice("google.".length));
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
  (url) => endsWithAny(url.hostname, ["startpage.com"]) && url.pathname.endsWith("/search") && hasParam(url, "query"),
  (url) => url.hostname === "kagi.com" && url.pathname === "/search" && hasParam(url, "q"),
  (url) => endsWithAny(url.hostname, ["yandex.com", "yandex.ru", "yandex.com.tr", "ya.ru"]) && url.pathname.startsWith("/search") && hasParam(url, "text"),
  (url) => endsWithAny(url.hostname, ["perplexity.ai"]) && (url.pathname.startsWith("/search/") || (url.pathname === "/search" && hasParam(url, "q"))),
  (url) => url.hostname === "you.com" && url.pathname === "/search" && hasParam(url, "q"),
  (url) => endsWithAny(url.hostname, ["swisscows.com"]) && url.pathname === "/web" && hasParam(url, "query"),
  (url) => url.hostname === "search.aol.com" && url.pathname.endsWith("/search") && hasParam(url, "q"),
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
