const puppeteer = require('puppeteer');

async function buscarAtacadao(produto) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(`https://www.sexshopatacadao.com.br/catalogsearch/result/?q=${encodeURIComponent(produto)}`, { waitUntil: 'networkidle2' });
  const produtos = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('.product-item-info'));
    return items.map(el => {
      const name = el.querySelector('.product-item-name a')?.innerText.trim();
      const price = el.querySelector('.price')?.innerText.trim();
      const link = el.querySelector('.product-item-name a')?.href;
      if (name && price && link) {
        return {
          name,
          price,
          site: 'Sexshop Atacadão',
          link,
          frete: 'Grátis a partir de R$ 150 (estimado)',
          pagamento: 'Pix, Boleto, Cartão'
        };
      }
      return null;
    }).filter(Boolean);
  });
  await browser.close();
  return produtos;
}
