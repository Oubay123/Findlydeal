// Pings IndexNow (Bing, Seznam, Yandex…) with every URL of the sitemap, so
// new and updated pages are crawled without waiting. Run after a deploy:
//   node scripts/indexnow-ping.mjs
// Google ignores IndexNow: submit the sitemap once in Search Console instead.
const HOST = "findlydeal.com";
const KEY = "5d6d0cb9d9a073723c1594a31ef7ead8";

const sitemap = await fetch(`https://${HOST}/sitemap.xml`).then((r) => r.text());
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (urls.length === 0) throw new Error("sitemap vide ?");

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls }),
});
console.log(`IndexNow: ${response.status} pour ${urls.length} URL`);
