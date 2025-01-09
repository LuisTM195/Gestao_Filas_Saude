require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const routes = require('./routes'); // Importe o arquivo de rotas

// Middleware
app.use(cors());
app.use(express.json()); // req.body

// Rotas
app.use('/api', routes); // Use as rotas definidas no arquivo routes.js

// Servir os arquivos estáticos do React
app.use(express.static(path.join(__dirname, '../proticket-client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../proticket-client/build', 'index.html'));
});

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});