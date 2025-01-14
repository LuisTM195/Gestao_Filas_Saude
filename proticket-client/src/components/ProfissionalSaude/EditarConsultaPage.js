import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './EditarConsultaPage.css'; // Certifique-se de que o arquivo CSS está sendo importado

const EditarConsultaPage = () => {
  const [idConsulta, setIdConsulta] = useState('');
  const [estado, setEstado] = useState('Pendente');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [numeroUtenteSaude, setNumeroUtenteSaude] = useState('');
  const [idProfissional, setIdProfissional] = useState('');
  const navigate = useNavigate();

  const handleEditConsulta = async () => {
    try {
      await axios.put(`http://localhost:5000/api/consultas/${idConsulta}`, {
        estado,
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
    <div className="container">
      <main>
        <div className="card">
          <h2>Editar Consulta</h2>
          <form>
            <div className="form-group">
              <label>ID Consulta:</label>
              <input
                type="text"
                value={idConsulta}
                onChange={(e) => setIdConsulta(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Estado:</label>
              <select value={estado} onChange={(e) => setEstado(e.target.value)}>
                <option value="Pendente">Pendente</option>
                <option value="Concluída">Concluída</option>
                <option value="Cancelada">Cancelada</option>
              </select>
            </div>
            <div className="form-group">
              <label>Data:</label>
              <input
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Hora:</label>
              <input
                type="time"
                value={hora}
                onChange={(e) => setHora(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Número Utente Saúde:</label>
              <input
                type="number"
                value={numeroUtenteSaude}
                onChange={(e) => setNumeroUtenteSaude(e.target.value)}
              />
            </div>
            <div className="form-group">
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
        <button className="voltar" onClick={() => navigate(-1)}>Voltar</button>
      </main>
    </div>
  );
};

export default EditarConsultaPage;