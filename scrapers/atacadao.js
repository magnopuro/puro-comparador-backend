const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async function buscarAtacadao(termo) {
  try {
    const url = `https://www.sexshopatacadao.com.br/busca?busca=${encodeURIComponent(termo)}`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const produtos = [];

    $('.listagem-item').each((_, el) => {
      const name = $(el).find('.nome-produto a').text().trim();
      const price = $(el).find('.preco-produto').first().text().trim();
      const link = $(el).find('.nome-produto a').attr('href');
      if (name && price && link) {
        produtos.push({ site: "Atacadão", name, price, link });
      }
    });

    return produtos;
  } catch (err) {
    return [];
  }
};