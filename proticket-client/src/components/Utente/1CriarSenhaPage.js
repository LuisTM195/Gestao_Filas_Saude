import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './1CriarSenhaPage.css'; // Certifique-se de que o arquivo CSS está sendo importado

function CriarSenhaPage() {
  const navigate = useNavigate();

  const handleSetorClick = async (setor) => {
    if (setor === 'Consulta Doença Aguda') {
      try {
        const response = await axios.post('http://localhost:5000/api/senhas', {
          numeroUtenteSaude: null,
          admissaoBalcao: true,
          setor,
          prioridade: 'alta',
        });
        console.log('Resposta do servidor:', response.data);
        alert('Senha criada com sucesso!');
        navigate('/imprimir-senha', { state: { senha: response.data } });
      } catch (error) {
        console.error('Erro ao criar senha:', error);
        alert('Erro ao criar senha. Tente novamente.');
      }
    } else {
      navigate(`/2CriarSenhaPage?setor=${setor}`);
    }
  };

  return (
    <div className="container">
      <main>
        <div className="card">
          <h2>Escolha o Setor</h2>
          <button onClick={() => handleSetorClick('Admissão')}>Admissão</button>
          <button onClick={() => handleSetorClick('Consulta Doença Aguda')}>Consulta Doença Aguda</button>
          <button onClick={() => handleSetorClick('Marcação')}>Marcação</button>
          <button onClick={() => handleSetorClick('Renovação de Medicação Habitual')}>Renovação de Medicação Habitual</button>
          <button onClick={() => handleSetorClick('Outros Assuntos')}>Outros Assuntos</button>
        </div>
      </main>
    </div>
  );
}

export default CriarSenhaPage;