const axios = require('axios');
const cheerio = require('cheerio');

async function buscarGall(produto) {
  try {
    const query = encodeURIComponent(produto);
    const url = `https://www.gall.com.br/catalogsearch/result/?q=${query}`;
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7'
      }
    });

    const $ = cheerio.load(data);
    const produtos = [];

    $('.product-item-info').each((_, el) => {
      const nome = $(el).find('.product-item-name a').text().trim();
      const preco = $(el).find('.price').first().text().trim();
      const href = $(el).find('.product-item-name a').attr('href');
      if (nome && preco && href) {
        produtos.push({
          name: nome,
          price: preco,
          site: 'Gall',
          link: href
        });
      }
    });

    return produtos;
  } catch (erro) {
    console.error('Erro ao buscar na Gall:', erro.message);
    return [];
  }
}

// Exemplo de uso local:
// buscarGall('preservativo').then(console.log);

module.exports = buscarGall;
