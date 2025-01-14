import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/Logo_NO_BG.png';
import './ProfissionalPage.css'; 

const ProfissionalPage = () => {
  const [authUrl, setAuthUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [tokens, setTokens] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { name } = location.state || { name: 'Profissional' }; 

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

  const navigateTo = (path, state = {}) => {
    navigate(path, { state });
  };

  return (
    <div className="container">
      <img src={logo} alt="Logo" className="logo" />
      <main>
        <div className="card">
          <h2>Bem-vindo, {name}!</h2>
          <p>Aqui pode gerir as consultas e utentes.</p>
        </div>
        <div className="button-container">
          <button onClick={() => navigateTo('/criar-consulta')}>Criar Consulta</button> {/* Botão para Criar consulta */}
          <button onClick={() => navigateTo('/consultas')}>Visualizar Consultas</button> {/* Botão para Visualizar consulta */}
          <button onClick={() => navigateTo('/criar-utente')}>Criar Utente</button> {/* Botão para Criar Utente */}
          <button onClick={() => navigateTo('/apagar-consulta')}>Apagar Consulta</button> {/* Botão para Apagar Consulta */}
          <button onClick={() => navigateTo('/editar-consulta')}>Editar Consulta</button>  {/* Botão para Editar Consulta */}
          {tokens ? (
            <div className="calendar-form">
              <h3>Marcar Consulta no Google Calendar</h3>
              <input
                type="text"
                placeholder="Título da Consulta"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              />
              <input
                type="text"
                placeholder="Descrição"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="datetime-local"
                placeholder="Início"
                value={start}
                onChange={(e) => setStart(e.target.value)}
              />
              <input
                type="datetime-local"
                placeholder="Fim"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
              />
              <button onClick={handleCreateEvent}>Marcar Consulta no Google Calendar</button>
            </div>
          ) : (
            <button onClick={() => window.location.href = authUrl}>Autenticar com Google</button>
          )}
          <button className="voltar" onClick={() => navigate(-1)}>Voltar</button>
        </div>
        <div className="calendar-embed">
          <iframe
            src="https://calendar.google.com/calendar/embed?src=luis0.0goncalves%40gmail.com&ctz=Europe%2FLisbon"
            style={{ border: 0 }}
            width="600"
            height="400"
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