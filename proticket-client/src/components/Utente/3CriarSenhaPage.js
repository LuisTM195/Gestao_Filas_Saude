import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './3CriarSenhaPage.css'; // Certifique-se de que o arquivo CSS está sendo importado

function CriarSenhaPage3() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const setor = queryParams.get('setor');
  const [numeroUtente, setNumeroUtente] = useState('');

  const handleInputChange = (event) => {
    setNumeroUtente(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Dados enviados:', {
      numeroUtenteSaude: numeroUtente,
      admissaoBalcao: false,
      setor,
      prioridade: 'normal',
    });
    try {
      const response = await axios.post('http://localhost:5000/api/senhas', {
        numeroUtenteSaude: numeroUtente,
        admissaoBalcao: false,
        setor,
        prioridade: 'normal',
      });
      console.log('Resposta do servidor:', response.data);
      alert('Senha criada com sucesso!');
      navigate('/imprimir-senha', { state: { senha: response.data } });
    } catch (error) {
      console.error('Erro ao criar senha:', error);
      alert('Erro ao criar senha. Tente novamente.');
    }
  };

  return (
    <div className="container">
      <main>
        <div className="card">
          <h2>Inserir Número de Utente</h2>
          <p>Setor: {setor}</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="numeroUtente">Número de Utente:</label>
              <input
                type="text"
                id="numeroUtente"
                value={numeroUtente}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit">Gerar Senha</button>
          </form>
        </div>
        <button className="voltar" onClick={() => navigate(-1)}>Voltar</button>
      </main>
    </div>
  );
}

export default CriarSenhaPage3;