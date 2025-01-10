import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/Logo_NO_BG.png'; // Certifique-se de que o caminho está correto
import './ProfissionalPage.css'; // Certifique-se de que o arquivo CSS está sendo importado

const ProfissionalPage = () => {
  const [authUrl, setAuthUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [tokens, setTokens] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { name } = location.state || { name: 'Profissional' }; // Receba o nome do profissional

  useEffect(() => {
    const fetchAuthUrl = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/google-calendar/auth-url');
        setAuthUrl(response.data.authUrl);
      } catch (error) {
        console.error('Erro ao obter URL de autenticação do Google:', error);
      }
    };

    fetchAuthUrl();

    const urlParams = new URLSearchParams(window.location.search);
    const tokensParam = urlParams.get('tokens');
    if (tokensParam) {
      setTokens(JSON.parse(tokensParam));
    }
  }, []);

  const handleCreateEvent = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/google-calendar/create-event', {
        summary,
        description,
        start,
        end,
        tokens,
      });
      alert('Consulta marcada com sucesso no Google Calendar!');
    } catch (error) {
      console.error('Erro ao marcar consulta no Google Calendar:', error);
      alert('Erro ao marcar consulta no Google Calendar. Tente novamente.');
    }
  };

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
        <div className="calendar-embed">
          <iframe
            src="https://calendar.google.com/calendar/embed?src=luis0.0goncalves%40gmail.com&ctz=Europe%2FLisbon"
            style={{ border: 0 }}
            width="800"
            height="600"
            frameBorder="0"
            scrolling="no"
            title="Google Calendar"
          ></iframe>
        </div>
      </main>
    </div>
  );
};

export default ProfissionalPage;