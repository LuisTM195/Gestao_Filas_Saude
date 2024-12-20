import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AcompanhamentoPage() {
  const [senhasEmCurso, setSenhasEmCurso] = useState([]);

  useEffect(() => {
    const fetchSenhas = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/senhas-em-curso');
        setSenhasEmCurso(response.data);
      } catch (error) {
        console.error('Erro ao buscar senhas:', error);
      }
    };
    fetchSenhas();
  }, []);

  return (
    <div>
      <h1>Acompanhar Senhas</h1>
      <div>
        <h2>Fila 1</h2>
        {senhasEmCurso.filter(senha => senha.fila === 1).length === 0 ? (
          <p>Não há senhas em curso na Fila 1.</p>
        ) : (
          <ul>
            {senhasEmCurso.filter(senha => senha.fila === 1).map(senha => (
              <li key={senha.idsenha}>
                Senha: {senha.numerosenha} - Setor: {senha.setor} - Estado: {senha.estado}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h2>Fila 2</h2>
        {senhasEmCurso.filter(senha => senha.fila === 2).length === 0 ? (
          <p>Não há senhas em curso na Fila 2.</p>
        ) : (
          <ul>
            {senhasEmCurso.filter(senha => senha.fila === 2).map(senha => (
              <li key={senha.idsenha}>
                Senha: {senha.numerosenha} - Setor: {senha.setor} - Estado: {senha.estado}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h2>Fila 3</h2>
        {senhasEmCurso.filter(senha => senha.fila === 3).length === 0 ? (
          <p>Não há senhas em curso na Fila 3.</p>
        ) : (
          <ul>
            {senhasEmCurso.filter(senha => senha.fila === 3).map(senha => (
              <li key={senha.idsenha}>
                Senha: {senha.numerosenha} - Setor: {senha.setor} - Estado: {senha.estado}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AcompanhamentoPage;