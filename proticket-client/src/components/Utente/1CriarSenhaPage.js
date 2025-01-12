import React from 'react';
import { useNavigate } from 'react-router-dom';
import './1CriarSenhaPage.css'; // Certifique-se de que o arquivo CSS está sendo importado

function CriarSenhaPage() {
  const navigate = useNavigate();

  const handleButtonClick = (setor) => {
    navigate(`/2CriarSenhaPage?setor=${setor}`);
  };

  return (
    <div className="container">
      <main>
        <div className="card">
          <h2>Escolha o Setor</h2>
          <div className="button-group">
            <button onClick={() => handleButtonClick('Admissão')}>Admissão</button>
            <button onClick={() => handleButtonClick('Consulta Doença Aguda')}>Consulta Doença Aguda</button>
            <button onClick={() => handleButtonClick('Marcação')}>Marcação</button>
            <button onClick={() => handleButtonClick('Renovação de Medicação Habitual')}>Renovação de Medicação Habitual</button>
            <button onClick={() => handleButtonClick('Outros Assuntos')}>Outros Assuntos</button>
          </div>
        </div>
        <button className="voltar" onClick={() => navigate(-1)}>Voltar</button>
      </main>
    </div>
  );
}

export default CriarSenhaPage;