const fs = require('fs');
const { google } = require('googleapis');
const path = require('path');

// Carregar as credenciais do cliente OAuth 2.0 a partir de variáveis de ambiente
const client_id = process.env.GOOGLE_CLIENT_ID;
const client_secret = process.env.GOOGLE_CLIENT_SECRET;
const redirect_uris = [process.env.GOOGLE_REDIRECT_URI];

const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

// Função para gerar a URL de autenticação
function getAuthUrl() {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/calendar'],
  });
  return authUrl;
}

// Função para obter o token de acesso
async function getAccessToken(code) {
  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);
  fs.writeFileSync(path.join(__dirname, 'token.json'), JSON.stringify(tokens));
}

// Função para carregar o token de acesso
function loadAccessToken() {
  const tokenPath = path.join(__dirname, 'token.json');
  if (fs.existsSync(tokenPath)) {
    const token = JSON.parse(fs.readFileSync(tokenPath));
    oAuth2Client.setCredentials(token);
  }
}

module.exports = {
  oAuth2Client,
  getAuthUrl,
  getAccessToken,
  loadAccessToken,
};