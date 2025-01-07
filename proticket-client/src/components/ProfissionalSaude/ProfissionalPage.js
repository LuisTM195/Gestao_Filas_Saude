import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const ProfissionalPage = () => {
  const [consultas, setConsultas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchConsultas();
  }, []);

  const fetchConsultas = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/consultas');
      console.log('Consultas fetched:', response.data);
      if (Array.isArray(response.data)) {
        setConsultas(response.data);
      } else {
        console.error('Erro: Dados retornados não são um array', response.data);
      }
    } catch (error) {
      console.error('Erro ao buscar consultas:', error);
    }
  };

  const handleEditClick = (consulta) => {
    navigate('/editar-consulta', { state: { consulta } });
  };

  return (
    <div>
      <h1>Profissional Page</h1>
      <Link to="/criar-consulta">
        <button type="button">Criar Consulta</button>
      </Link>
      <Link to="/apagar-consulta">
        <button type="button">Apagar Consulta</button>
      </Link>
      <h2>Consultas</h2>
      <ul>
        {Array.isArray(consultas) ? (
          consultas.map((consulta) => (
            <li key={consulta.IdConsulta}>
              {new Date(consulta.Data).toLocaleDateString()} {consulta.Hora} - Estado: {consulta.Estado} - Utente: {consulta.NumeroUtenteSaude} - Profissional: {consulta.IdProfissional}
              <button type="button" onClick={() => handleEditClick(consulta)}>
                Editar
              </button>
            </li>
          ))
        ) : (
          <li>Erro: Dados de consultas não são um array</li>
        )}
      </ul>
      <Link to="/consultas">
        <button type="button">Visualizar Consultas</button>
      </Link>
    </div>
  );
};

export default ProfissionalPage;