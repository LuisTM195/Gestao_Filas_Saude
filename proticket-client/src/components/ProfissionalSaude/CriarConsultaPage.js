import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CriarConsulta = () => {
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [numeroUtenteSaude, setNumeroUtenteSaude] = useState('');
  const [idProfissional, setIdProfissional] = useState('');
  const navigate = useNavigate();

  const handleCreateConsulta = async () => {
    const consultaData = {
      estado: 'Pendente', // Defina o estado como "Pendente"
      data,
      hora,
      numeroUtenteSaude,
      idProfissional,
    };
    console.log('Dados enviados:', consultaData); // Adicione este log para verificar os dados enviados
    try {
      const response = await axios.post('http://localhost:5000/api/consultas', consultaData);
      alert('Consulta criada com sucesso!');
      navigate('/profissional'); // Redirecione de volta para a página do profissional
    } catch (error) {
      console.error('Erro ao criar consulta:', error);
      alert('Erro ao criar consulta');
    }
  };

  return (
    <div>
      <h1>Criar Consulta</h1>
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
    </div>
  );
};

export default CriarConsulta;