const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async function buscarMiess(termo) {
  try {
    const url = `https://www.miess.com.br/catalogsearch/result/?q=${encodeURIComponent(termo)}`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const produtos = [];

    $('.item').each((_, el) => {
      const name = $(el).find('.product-name a').text().trim();
      const price = $(el).find('.price').first().text().trim();
      const link = $(el).find('.product-name a').attr('href');
      if (name && price && link) {
        produtos.push({ site: "Miess", name, price, link });
      }
    });

    return produtos;
  } catch (err) {
    return [];
  }
};