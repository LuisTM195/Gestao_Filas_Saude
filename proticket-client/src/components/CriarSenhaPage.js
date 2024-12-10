import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CriarSenhaPage() {
  const [setor, setSetor] = useState('');
  const navigate = useNavigate();

  const handleSetorChange = (e) => {
    setSetor(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!setor) {
      alert('Por favor, selecione uma opção.');
      return;
    }
    navigate(`/detalhes-senha?setor=${setor}`);
  };

  return (
    <div>
      <h1>Criar Senha</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <input
              type="radio"
              value="Admissão"
              checked={setor === 'Admissão'}
              onChange={handleSetorChange}
            />
            Admissão
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="Consulta Doença Aguda"
              checked={setor === 'Consulta Doença Aguda'}
              onChange={handleSetorChange}
            />
            Consulta Doença Aguda
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="Marcação"
              checked={setor === 'Marcação'}
              onChange={handleSetorChange}
            />
            Marcação
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="Renovação de Medicação Habitual"
              checked={setor === 'Renovação de Medicação Habitual'}
              onChange={handleSetorChange}
            />
            Renovação de Medicação Habitual
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="Outros Assuntos"
              checked={setor === 'Outros Assuntos'}
              onChange={handleSetorChange}
            />
            Outros Assuntos
          </label>
        </div>
        <button type="submit">Criar Senha</button>
      </form>
    </div>
  );
}

export default CriarSenhaPage;