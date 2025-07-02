const axios = require('axios');
const cheerio = require('cheerio');

async function buscarAtacadao(produto) {
  try {
    const query = encodeURIComponent(produto);
    const url = `https://www.sexshopatacadao.com.br/catalogsearch/result/?q=${query}`;

    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    });

    const $ = cheerio.load(data);

    // Log do HTML de retorno para debug
    // console.log(data); // ATENÇÃO: pode ser muito grande!

    const produtos = [];
    const itens = $('.product-item-info');
    console.log('Itens encontrados:', itens.length);

    itens.each((_, el) => {
      const nome = $(el).find('.product-item-name a').text().trim();
      const preco = $(el).find('.price').first().text().trim();
      const href = $(el).find('.product-item-name a').attr('href');
      const link = href ? href : null;

      if (nome && preco && link) {
        produtos.push({
          name: nome,
          price: preco,
          site: 'Sexshop Atacadão',
          link,
          frete: 'Grátis a partir de R$ 150 (estimado)',
          pagamento: 'Pix, Boleto, Cartão'
        });
      }
    });

    return produtos;
  } catch (erro) {
    console.error('Erro ao procurar no Atacadão:', erro.message);
    return [];
  }
}

module.exports = buscarAtacadao;
