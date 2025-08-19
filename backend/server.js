const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Configura as opções do CORS
const corsOptions = {
  origin: '*', // Permite que qualquer origem acesse a API
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
};

// Usa o CORS com as opções configuradas
app.use(cors(corsOptions));

// Importar as rotas
const productionRoutes = require('./routes/productionRoutes');

// Usar as rotas no endpoint /api/production (A LINHA CRÍTICA)
app.use('/api/production', productionRoutes);

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`🚀 Backend pronto e rodando na porta ${PORT}`);
});
