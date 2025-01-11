import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ConsultasPage.css'; // Certifique-se de que o arquivo CSS está sendo importado

const ConsultasPage = () => {
  const [numeroUtenteSaude, setNumeroUtenteSaude] = useState('');
  const [consultas, setConsultas] = useState([]);
  const navigate = useNavigate();

  const fetchConsultas = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/consultas/${numeroUtenteSaude}`);
      console.log(response.data); // Verifique os dados retornados no console do navegador
      setConsultas(response.data);
    } catch (error) {
      console.error('Erro ao buscar consultas:', error);
      alert('Erro ao buscar consultas');
    }
  };

  return (
    <div className="container">
      <main>
        <div className="card">
          <h2>Consultas</h2>
          <div className="form-group">
            <label>Número Utente Saúde:</label>
            <input
              type="number"
              value={numeroUtenteSaude}
              onChange={(e) => setNumeroUtenteSaude(e.target.value)}
            />
            <button type="button" onClick={fetchConsultas}>
              Visualizar Consultas
            </button>
          </div>
          <ul>
            {consultas.map((consulta) => (
              <li key={consulta.idconsulta}>
                {new Date(consulta.data).toLocaleDateString()} {consulta.hora} - Estado: {consulta.estado} - Utente: {consulta.numeroutentesaude} - Profissional: {consulta.idprofissional}
              </li>
            ))}
          </ul>
        </div>
        <button className="voltar" onClick={() => navigate(-1)}>Voltar</button>
      </main>
    </div>
  );
};

export default ConsultasPage;