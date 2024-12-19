import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ConsultasPage.css';

const ConsultasPage = () => {
  const [numeroUtente, setNumeroUtente] = useState('');
  const [consultas, setConsultas] = useState([]);
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleNumeroUtenteChange = (e) => {
    setNumeroUtente(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/api/consultas/${numeroUtente}`);
      setConsultas(response.data);
      setErro('');
    } catch (error) {
      console.error('Erro ao buscar consultas:', error);
      setErro('Erro ao buscar consultas. Verifique o número de utente e tente novamente.');
    }
  };

  const formatarData = (data) => {
    const dataObj = new Date(data);
    return dataObj.toLocaleDateString();
  };

  const formatarHora = (hora) => {
    const horaObj = new Date(`1970-01-01T${hora}Z`);
    return horaObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="container">
      <h1>Consultas</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Número de Utente de Saúde:
          <input
            type="text"
            value={numeroUtente}
            onChange={handleNumeroUtenteChange}
          />
        </label>
        <button type="submit">Buscar Consultas</button>
      </form>
      {erro && <p className="erro">{erro}</p>}
      <div className="consultas">
        {consultas.length > 0 ? (
          <ul>
            {consultas.map((consulta) => (
              <li key={consulta.id_consulta}>
                <p>Data: {formatarData(consulta.data)}</p>
                <p>Hora: {formatarHora(consulta.hora)}</p>
                <p>Profissional: {consulta.nome_profissional}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhuma consulta encontrada.</p>
        )}
      </div>
      <button className="voltar" onClick={() => navigate(-1)}>Voltar</button>
    </div>
  );
};

export default ConsultasPage;