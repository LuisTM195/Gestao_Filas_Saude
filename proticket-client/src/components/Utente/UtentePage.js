import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UtentePage.css';

const UtentePage = () => {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div className="container">
      <h1>Utente Page</h1>
      <button onClick={() => navigateTo('/criar-senha')}>Criar Senha</button>
      <button onClick={() => navigateTo('/consultas')}>Visualizar Consultas</button>
      <button className="voltar" onClick={() => navigate(-1)}>Voltar</button>
    </div>
  );
};

export default UtentePage;