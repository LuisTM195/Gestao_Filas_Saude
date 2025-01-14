import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PrescricaoPage.css'; // Certifique-se de que o arquivo CSS está sendo importado

const PrescricaoPage = () => {
  const [numeroUtenteSaude, setNumeroUtenteSaude] = useState('');
  const [prescricoes, setPrescricoes] = useState([]);
  const navigate = useNavigate();

  const fetchPrescricoes = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/prescricoes/${numeroUtenteSaude}`);
      if (Array.isArray(response.data)) {
        setPrescricoes(response.data);
      } else {
        setPrescricoes([]);
        console.error('Resposta da API não é um array:', response.data);
      }
    } catch (error) {
      console.error('Erro ao buscar prescrições:', error);
      alert('Erro ao buscar prescrições. Tente novamente.');
    }
  };

  return (
    <div className="container">
      <main>
        <div className="card">
          <h2>Prescrições</h2>
          <div className="form-group">
            <label>Número Utente Saúde:</label>
            <input
              type="number"
              value={numeroUtenteSaude}
              onChange={(e) => setNumeroUtenteSaude(e.target.value)}
            />
            <button type="button" onClick={fetchPrescricoes}>
              Visualizar Prescrições
            </button>
          </div>
          <ul>
            {prescricoes.length > 0 ? (
              prescricoes.map((prescricao) => (
                <li key={prescricao.idmedicacao}>
                  {new Date(prescricao.datavalidade).toLocaleDateString()} - Nome: {prescricao.nome} - Descrição: {prescricao.descricao} - Dosagem: {prescricao.dosagem}
                </li>
              ))
            ) : (
              <p>Nenhuma prescrição encontrada para este utente.</p>
            )}
          </ul>
        </div>
        <button className="voltar" onClick={() => navigate(-1)}>Voltar</button>
      </main>
    </div>
  );
};

export default PrescricaoPage;