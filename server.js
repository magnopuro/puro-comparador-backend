const express = require('express');
const cors = require('cors');
const gall = require('./scrapers/gall');
const miess = require('./scrapers/miess');
const atacadao = require('./scrapers/atacadao');

const app = express();
app.use(cors());

app.get('/buscar', async (req, res) => {
  const termo = req.query.termo;
  if (!termo) return res.status(400).json({ erro: "Termo obrigatório" });

  try {
    const [gallData, miessData, atacadaoData] = await Promise.all([
      gall(termo),
      miess(termo),
      atacadao(termo),
    ]);
    res.json([...gallData, ...miessData, ...atacadaoData]);
  } catch (e) {
    res.status(500).json({ erro: "Erro ao buscar produtos" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));