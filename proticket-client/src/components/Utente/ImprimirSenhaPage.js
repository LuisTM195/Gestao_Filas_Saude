import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ImprimirSenhaPage.css'; // Certifique-se de que o arquivo CSS está sendo importado

function ImprimirSenhaPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { senha } = location.state || {};

  if (!senha) {
    return <p>Erro: Nenhuma senha encontrada.</p>;
  }

  return (
    <div className="container">
      <main>
        <div className="card">
          <h2>Informações da Senha</h2>
          <p><strong>Número da Senha:</strong> {senha.numerosenha}</p>
          <p><strong>Setor:</strong> {senha.setor}</p>
          <p><strong>Prioridade:</strong> {senha.prioridade}</p>
          <p><strong>Data de Emissão:</strong> {senha.dataemissao}</p>
          <p><strong>Hora de Emissão:</strong> {senha.horaemissao}</p>
          <p><strong>Estado:</strong> {senha.estado}</p>
          <p><strong>Número de Utente:</strong> {senha.numeroutentesaude}</p>
          <button onClick={() => navigate('/utente')}>Voltar</button>
        </div>
      </main>
    </div>
  );
}

export default ImprimirSenhaPage;