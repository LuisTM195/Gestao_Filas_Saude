import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ApagarConsultaPage = () => {
  const [idConsulta, setIdConsulta] = useState('');
  const navigate = useNavigate();

  const handleDeleteConsulta = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/consultas/${idConsulta}`);
      alert('Consulta apagada com sucesso!');
      navigate('/profissional'); // Redirecione de volta para a página do profissional
    } catch (error) {
      console.error('Erro ao apagar consulta:', error);
      alert('Erro ao apagar consulta');
    }
  };

  return (
    <div>
      <h1>Apagar Consulta</h1>
      <form>
        <div>
          <label>ID Consulta:</label>
          <input
            type="number"
            value={idConsulta}
            onChange={(e) => setIdConsulta(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleDeleteConsulta}>
          Apagar Consulta
        </button>
      </form>
    </div>
  );
};

export default ApagarConsultaPage;