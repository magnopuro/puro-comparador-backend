const axios = require('axios');
const cheerio = require('cheerio');

async function buscarGall(termo) {
  const url = `https://www.gall.com.br/busca?termo=${encodeURIComponent(termo)}`;
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const produtos = [];

    $('.listagem .produto-item').each((_, el) => {
      const nome = $(el).find('.nome-produto').text().trim();
      const preco = $(el).find('.preco-produto .preco-por').text().trim();
      const link = 'https://www.gall.com.br' + $(el).find('a').attr('href');

      if (nome && preco) {
        produtos.push({
          name: nome,
          price: preco,
          site: 'Gall',
          link,
          frete: 'R$ 9,90 (estimado)', // valor fixo ou ajustar depois com scraping de frete
          pagamento: 'Cartão, Pix, Boleto'
        });
      }
    });

    return produtos;
  } catch (error) {
    console.error('Erro ao procurar na Gall:', erro.message);
    return [];
  }
}

module.exports = buscarGall;
