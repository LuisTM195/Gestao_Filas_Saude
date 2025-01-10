import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/Logo_NO_BG.png'; // Certifique-se de que o caminho está correto
import './UtentePage.css'; // Certifique-se de que o arquivo CSS está sendo importado

const UtentePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { name } = location.state || { name: 'Utente' }; // Receba o nome do utente

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div className="container">
      <img src={logo} alt="Logo" className="logo" />
      <main>
        <div className="card">
          <h2>Bem-vindo, {name}!</h2>
          <p>Aqui você pode gerir as suas consultas e informações pessoais.</p>
        </div>
        <div className="button-container">
          <button onClick={() => navigateTo('/consultas')}>Visualizar Consultas</button>
          <button onClick={() => navigateTo('/criar-senha')}>Criar Senha</button>
          <button className="voltar" onClick={() => navigate(-1)}>Voltar</button>
        </div>
      </main>
    </div>
  );
};

export default UtentePage;