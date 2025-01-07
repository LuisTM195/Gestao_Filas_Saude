import React, { useState } from 'react';
import axios from 'axios';

const ConsultasPage = () => {
  const [numeroUtenteSaude, setNumeroUtenteSaude] = useState('');
  const [consultas, setConsultas] = useState([]);

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
    <div>
      <h1>Consultas</h1>
      <div>
        <label>Número Utente Saúde:</label>
        <input
          type="number"
          value={numeroUtenteSaude}
          onChange={(e) => setNumeroUtenteSaude(e.target.value)}
        />
        <button type="button" onClick={fetchConsultas}>
          Buscar Consultas
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
  );
};

export default ConsultasPage;