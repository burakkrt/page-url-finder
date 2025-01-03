const axios = require("axios");
const cheerio = require("cheerio");

// HTML içeriğini almak için axios ile HTTP isteği gönderen fonksiyon
const fetchHTML = async (pagePath, baseUrl) => {
  try {
    const { data } = await axios.get(`${baseUrl}${pagePath}`);
    return data;
  } catch (error) {
    throw new Error(`HTML alınamadı: ${error.message}`);
  }
};

// HTML içeriğinden bağlantıları çıkaran fonksiyon
const extractLinks = (html, baseUrl, linkType) => {
  const $ = cheerio.load(html);

  const links = [];
  $("a").each((_, element) => {
    const link = $(element).attr("href");
    if (link) {
      // Tam URL oluşturuluyor
      links.push(new URL(link, baseUrl).href);
    }
  });

  switch (linkType) {
    case "all-data":
      return links;
    case "external-links":
      return links.filter((link) => !link?.startsWith(baseUrl));
    case "internal-links":
      return links.filter((link) => link?.startsWith(baseUrl));
    default:
      return links;
  }
};

// Web scraping işlemi için API endpoint
const scrapeLinks = async (req, res) => {
  const { pagePath, linkType } = req.query;

  if (!pagePath) {
    return res.status(400).json({ error: "Page path sağlanmalıdır" });
  }

  try {
    const baseUrl = process.env.BASE_URL;
    const html = await fetchHTML(pagePath, baseUrl);
    const links = extractLinks(html, baseUrl, linkType);

    return res.status(200).json({
      data: links,
      length: links.length,
      searchUrl: baseUrl + pagePath,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = scrapeLinks;
