import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function DetalhesSenhaPage() {
  const [numeroUtenteSaude, setNumeroUtenteSaude] = useState('');
  const [admissaoBalcao, setAdmissaoBalcao] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const setor = queryParams.get('setor');

  const handleNumeroUtenteSaudeChange = (e) => {
    setNumeroUtenteSaude(e.target.value);
  };

  const handleAdmissaoBalcaoChange = (e) => {
    setAdmissaoBalcao(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/senhas', {
        numeroUtenteSaude: admissaoBalcao ? null : numeroUtenteSaude,
        admissaoBalcao,
        setor
      });
      console.log('Resposta do servidor:', response.data);
      alert('Senha criada com sucesso!');
      navigate('/');
    } catch (error) {
      console.error('Erro ao criar senha:', error);
      alert('Erro ao criar senha. Tente novamente.');
    }
  };

  return (
    <div>
      <h1>Detalhes da Senha</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Número de Utente de Saúde:
            <input
              type="text"
              value={numeroUtenteSaude}
              onChange={handleNumeroUtenteSaudeChange}
              disabled={admissaoBalcao}
            />
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={admissaoBalcao}
              onChange={handleAdmissaoBalcaoChange}
            />
            Admissão ao Balcão (sem número de utente de saúde)
          </label>
        </div>
        <button type="submit">Criar Senha</button>
      </form>
    </div>
  );
}

export default DetalhesSenhaPage;