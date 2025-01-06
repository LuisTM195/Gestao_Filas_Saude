import React, { useState } from 'react';
import axios from 'axios';

const ProfissionalPage = () => {
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [numeroUtenteSaude, setNumeroUtenteSaude] = useState('');
  const [idProfissional, setIdProfissional] = useState('');
  const [consultas, setConsultas] = useState([]);

  const handleCreateConsulta = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/consultas', {
        data,
        hora,
        numeroUtenteSaude,
        idProfissional,
      });
      alert('Consulta criada com sucesso!');
    } catch (error) {
      console.error('Erro ao criar consulta:', error);
      alert('Erro ao criar consulta');
    }
  };

  const handleViewConsultas = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/consultas');
      setConsultas(response.data);
    } catch (error) {
      console.error('Erro ao visualizar consultas:', error);
      alert('Erro ao visualizar consultas');
    }
  };

  const handleDeleteConsulta = async (idConsulta) => {
    try {
      await axios.delete(`http://localhost:5000/api/consultas/${idConsulta}`);
      alert('Consulta apagada com sucesso!');
      handleViewConsultas(); // Atualiza a lista de consultas
    } catch (error) {
      console.error('Erro ao apagar consulta:', error);
      alert('Erro ao apagar consulta');
    }
  };

  return (
    <div>
      <h1>Profissional Page</h1>
      <form>
        <div>
          <label>Data:</label>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
        </div>
        <div>
          <label>Hora:</label>
          <input
            type="time"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
          />
        </div>
        <div>
          <label>Número Utente Saúde:</label>
          <input
            type="number"
            value={numeroUtenteSaude}
            onChange={(e) => setNumeroUtenteSaude(e.target.value)}
          />
        </div>
        <div>
          <label>ID Profissional:</label>
          <input
            type="number"
            value={idProfissional}
            onChange={(e) => setIdProfissional(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleCreateConsulta}>
          Criar Consulta
        </button>
      </form>
      <button type="button" onClick={handleViewConsultas}>
        Visualizar Consultas
      </button>
      <div>
        <h2>Consultas</h2>
        <ul>
          {consultas.map((consulta) => (
            <li key={consulta.IdConsulta}>
              {consulta.Data} {consulta.Hora} - Utente: {consulta.NumeroUtenteSaude} - Profissional: {consulta.IdProfissional}
              <button type="button" onClick={() => handleDeleteConsulta(consulta.IdConsulta)}>
                Apagar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfissionalPage;