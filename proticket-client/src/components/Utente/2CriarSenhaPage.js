import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './2CriarSenhaPage.css'; // Certifique-se de que o arquivo CSS está sendo importado

function CriarSenhaPage2() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const setor = queryParams.get('setor');

  const handleButtonClick = (tipo) => {
    if (tipo === 'numeroUtente') {
      navigate(`/3CriarSenhaPage?setor=${setor}`);
    } else if (tipo === 'balcao') {
      navigate(`/4CriarSenhaPage?setor=${setor}`);
    }
  };

  return (
    <div className="container">
      <main>
        <div className="card">
          <h2>Escolha o Tipo de Atendimento</h2>
          <div className="button-group">
            <button onClick={() => handleButtonClick('numeroUtente')}>Inserir Número de Utente</button>
            <button onClick={() => handleButtonClick('balcao')}>Atendimento ao Balcão</button>
          </div>
        </div>
        <button className="voltar" onClick={() => navigate(-1)}>Voltar</button>
      </main>
    </div>
  );
}

export default CriarSenhaPage2;