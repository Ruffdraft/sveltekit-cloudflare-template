import { XMLParser } from 'fast-xml-parser';

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
  const feeds = [
    'https://www.cisa.gov/sites/default/files/feeds/ics-advisories.xml',
    'https://www.securityweek.com/category/ics/feed/'
  ];
  const parser = new XMLParser();
  const news = [];

  for (const url of feeds) {
    try {
      const res = await fetch(url);
      const text = await res.text();
      const data = parser.parse(text);
      let items = data.rss?.channel?.item || [];
      if (!Array.isArray(items)) items = [items];
      for (const item of items.slice(0, 5)) {
        news.push({
          title: item.title,
          link: Array.isArray(item.link) ? item.link[0] : item.link,
          pubDate: item.pubDate
        });
      }
    } catch (e) {
      console.error('Failed to load feed ' + url, e);
    }
  }

  news.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
  return { news };
}
