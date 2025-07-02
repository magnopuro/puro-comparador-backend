const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async function buscarGall(termo) {
  try {
    const url = `https://www.gall.com.br/catalogsearch/result/?q=${encodeURIComponent(termo)}`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const produtos = [];

    $('.product-item-info').each((_, el) => {
      const name = $(el).find('.product-item-link').text().trim();
      const price = $(el).find('.price').first().text().trim();
      const link = $(el).find('.product-item-link').attr('href');
      if (name && price && link) {
        produtos.push({ site: "Gall", name, price, link });
      }
    });

    return produtos;
  } catch (err) {
    return [];
  }
};