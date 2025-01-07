import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const EditarConsultaPage = () => {
  const location = useLocation();
  const { consulta } = location.state || {};
  const [data, setData] = useState(consulta?.Data || '');
  const [hora, setHora] = useState(consulta?.Hora || '');
  const [numeroUtenteSaude, setNumeroUtenteSaude] = useState(consulta?.NumeroUtenteSaude || '');
  const [idProfissional, setIdProfissional] = useState(consulta?.IdProfissional || '');
  const navigate = useNavigate();

  const handleEditConsulta = async () => {
    try {
      await axios.put(`http://localhost:5000/api/consultas/${consulta.IdConsulta}`, {
        estado: 'Pendente', // Defina o estado como "Pendente"
        data,
        hora,
        numeroUtenteSaude,
        idProfissional,
      });
      alert('Consulta editada com sucesso!');
      navigate('/profissional'); // Redirecione de volta para a página do profissional
    } catch (error) {
      console.error('Erro ao editar consulta:', error);
      alert('Erro ao editar consulta');
    }
  };

  return (
    <div>
      <h1>Editar Consulta</h1>
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
        <button type="button" onClick={handleEditConsulta}>
          Editar Consulta
        </button>
      </form>
    </div>
  );
};

export default EditarConsultaPage;