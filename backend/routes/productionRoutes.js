const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/', (req, res) => {
  const dataPath = path.join(__dirname, '..', 'data', 'producao.json');
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.error("Erro ao ler o arquivo de dados:", err);
      return res.status(500).send('Erro interno do servidor.');
    }
    res.json(JSON.parse(data));
  });
});

module.exports = router; // A LINHA CRÍTICA
