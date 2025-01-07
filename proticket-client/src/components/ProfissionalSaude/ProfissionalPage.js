import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfissionalPage = () => {
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [estado, setEstado] = useState('');
  const [numeroUtenteSaude, setNumeroUtenteSaude] = useState('');
  const [idProfissional, setIdProfissional] = useState('');
  const [consultas, setConsultas] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchConsultas();
  }, []);

  const fetchConsultas = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/consultas');
      setConsultas(response.data);
    } catch (error) {
      console.error('Erro ao buscar consultas:', error);
    }
  };

  const handleCreateConsulta = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/consultas', {
        estado,
        data,
        hora,
        numeroUtenteSaude,
        idProfissional,
      });
      alert('Consulta criada com sucesso!');
      fetchConsultas();
    } catch (error) {
      console.error('Erro ao criar consulta:', error);
      alert('Erro ao criar consulta');
    }
  };

  const handleEditConsulta = async () => {
    try {
      await axios.put(`http://localhost:5000/api/consultas/${editId}`, {
        estado,
        data,
        hora,
        numeroUtenteSaude,
        idProfissional,
      });
      alert('Consulta editada com sucesso!');
      fetchConsultas();
      setEditId(null);
    } catch (error) {
      console.error('Erro ao editar consulta:', error);
      alert('Erro ao editar consulta');
    }
  };

  const handleDeleteConsulta = async (idConsulta) => {
    try {
      await axios.delete(`http://localhost:5000/api/consultas/${idConsulta}`);
      alert('Consulta apagada com sucesso!');
      fetchConsultas();
    } catch (error) {
      console.error('Erro ao apagar consulta:', error);
      alert('Erro ao apagar consulta');
    }
  };

  const handleEditClick = (consulta) => {
    setEditId(consulta.ID_Consulta);
    setEstado(consulta.Estado);
    setData(consulta.Data);
    setHora(consulta.Hora);
    setNumeroUtenteSaude(consulta.NumeroUtenteSaude);
    setIdProfissional(consulta.IdProfissional);
  };

  return (
    <div>
      <h1>Profissional Page</h1>
      <form>
        <div>
          <label>Estado:</label>
          <input
            type="text"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          />
        </div>
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
        {editId ? (
          <button type="button" onClick={handleEditConsulta}>
            Editar Consulta
          </button>
        ) : (
          <button type="button" onClick={handleCreateConsulta}>
            Criar Consulta
          </button>
        )}
      </form>
      <h2>Consultas</h2>
      <ul>
        {consultas.map((consulta) => (
          <li key={consulta.ID_Consulta}>
            {consulta.Data} {consulta.Hora} - Estado: {consulta.Estado} - Utente: {consulta.NumeroUtenteSaude} - Profissional: {consulta.IdProfissional}
            <button type="button" onClick={() => handleEditClick(consulta)}>
              Editar
            </button>
            <button type="button" onClick={() => handleDeleteConsulta(consulta.ID_Consulta)}>
              Apagar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfissionalPage;