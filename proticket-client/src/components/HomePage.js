import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import logo from '../assets/Logo NO BG.png';

const HomePage = () => {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div className="container">
      <img src={logo} alt="Logo" className="logo" />
      <h1>Bem-vindo ao Proticket</h1>
      <button onClick={() => navigateTo('/utente')}>Utente</button>
      <button onClick={() => navigateTo('/profissional')}>Profissional Saúde</button>
      <button onClick={() => navigateTo('/funcionario')}>Funcionário</button>
    </div>
  );
};

export default HomePage;