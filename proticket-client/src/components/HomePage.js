import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo NO BG.png';
import './HomePage.css';

function HomePage() {
  return (
    <div className="homepage">
      <header className="homepage-header">
        <img src={logo} className="homepage-logo" alt="logo" />
        <h1>Bem-vindo ao Sistema de Senhas</h1>
      </header>
      <nav className="homepage-nav">
        <ul>
          <li>
            <Link to="/criar-senha">Criar Senha</Link>
          </li>
          <li>
            <Link to="/funcionario">Funcionário</Link>
          </li>
          <li>
            <Link to="/acompanhar-senhas">Acompanhar Senhas</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default HomePage;