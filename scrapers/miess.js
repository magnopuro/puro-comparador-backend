const axios = require('axios');
const cheerio = require('cheerio');

async function buscarMiess(termo) {
  try {
    const url = `https://www.miess.com.br/catalogsearch/result/?q=${encodeURIComponent(termo)}`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const produtos = [];

    $('.item').each((_, el) => {
      const nome = $(el).find('.product-name a').text().trim();
      const preco = $(el).find('.price').first().text().trim();
      const href = $(el).find('.product-name a').attr('href');
      const link = href ? href : null;

      if (nome && preco && link) {
        produtos.push({
          name: nome,
          price: preco,
          site: 'Miess',
          link,
          frete: 'R$ 19,90 (estimado)', // ajuste conforme necessário
          pagamento: 'Cartão, Pix, Boleto'
        });
      }
    });

    return produtos;
  } catch (erro) {
    console.error('Erro ao procurar na Miess:', erro.message);
    return [];
  }
}

module.exports = buscarMiess;
