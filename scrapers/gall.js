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
      const href = $(el).find('a').attr('href');
      const link = href ? 'https://www.gall.com.br' + href : null;

      if (nome && preco && link) {
        produtos.push({
          name: nome,
          price: preco,
          site: 'Gall',
          link,
          frete: 'R$ 9,90 (estimado)', // valor fixo, ajuste se necessário
          pagamento: 'Cartão, Pix, Boleto'
        });
      }
    });

    return produtos;
  } catch (erro) {
    console.error('Erro ao procurar na Gall:', erro.message);
    return [];
  }
}

module.exports = buscarGall;
