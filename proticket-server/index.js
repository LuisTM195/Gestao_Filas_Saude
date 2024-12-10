const express = require('express');
const path = require('path'); // Certifique-se de que o módulo path está sendo usado apenas no servidor
const app = express();
const cors = require('cors');
const pool = require('./db'); // Certifique-se de que o arquivo db.js está configurado corretamente

// Middleware
app.use(cors());
app.use(express.json()); // req.body

// Rotas
app.use('/api', require('./routes')); // Certifique-se de que o arquivo routes.js está configurado corretamente

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