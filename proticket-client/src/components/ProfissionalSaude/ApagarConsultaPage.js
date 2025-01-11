import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/Logo_NO_BG.png'; // Certifique-se de que o caminho está correto
import './ApagarConsultaPage.css'; // Certifique-se de que o arquivo CSS está sendo importado

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
    <div className="container">
      <img src={logo} alt="Logo" className="logo" />
      <main>
        <div className="card">
          <h2>Apagar Consulta</h2>
          <form>
            <div className="form-group">
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
        <button className="voltar" onClick={() => navigate(-1)}>Voltar</button>
      </main>
    </div>
  );
};

export default ApagarConsultaPage;