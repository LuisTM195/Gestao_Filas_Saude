import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import logo from '../../assets/Logo_NO_BG.png'; // Certifique-se de que o caminho está correto
import './UtentePage.css'; // Certifique-se de que o arquivo CSS está sendo importado

const UtentePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { name } = location.state || { name: 'Utente' }; // Receba o nome do utente

  const navigateTo = (path) => {
    navigate(path);
  };

  // Substitua '192.168.1.100' pelo endereço IP local do seu computador
  const currentUrl = window.location.href.replace('localhost', '192.168.1.100');

  return (
    <div className="container">
      <img src={logo} alt="Logo" className="logo" />
      <main>
        <div className="card">
          <h2>Bem-vindo caro {name}!</h2>
          <p>Aqui pode gerir as suas consultas e informações pessoais.</p>
        </div>
        <div className="button-container">
          <button onClick={() => navigateTo('/consultas')}>Visualizar Consultas</button>
          <button onClick={() => navigateTo('/1CriarSenhaPage')}>Criar Senha</button> {/* Atualize a rota para 1CriarSenhaPage */}
          <button className="voltar" onClick={() => navigate(-1)}>Voltar</button>
        </div>
        <div className="qr-code">
          <h3>Leia este QR Code para abrir esta página no seu smartphone:</h3>
          <QRCodeCanvas value={currentUrl} size={128} />
        </div>
      </main>
    </div>
  );
};

export default UtentePage;