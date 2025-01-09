import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/Logo_NO_BG.png'; // Certifique-se de que o caminho está correto
import './ProfissionalPage.css'; // Certifique-se de que o arquivo CSS está sendo importado

const ProfissionalPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { name } = location.state || { name: 'Profissional' }; // Receba o nome do profissional

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div>
      <header>
        <img src={logo} alt="Logo" />
        <h1>Profissional Page</h1>
        <div className="user-name">{name}</div> {/* Exiba o nome do profissional */}
      </header>
      <main>
        <div className="card">
          <h2>Bem-vindo, {name}!</h2>
          <p>Aqui você pode gerir as suas consultas e pacientes.</p>
        </div>
        <button onClick={() => navigateTo('/criar-consulta')}>Criar Consulta</button>
        <button onClick={() => navigateTo('/consultas')}>Visualizar Consultas</button>
        <button onClick={() => navigateTo('/criar-utente')}>Criar Utente</button> {/* Botão para Criar Utente */}
        <button onClick={() => navigateTo('/apagar-consulta')}>Apagar Consulta</button> {/* Botão para Apagar Consulta */}
        <button className="voltar" onClick={() => navigate(-1)}>Voltar</button>
      </main>
    </div>
  );
};

export default ProfissionalPage;