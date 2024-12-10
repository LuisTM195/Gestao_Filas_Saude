import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AcompanhamentoPage() {
  const [senhasFila1, setSenhasFila1] = useState([]);
  const [senhasFila2, setSenhasFila2] = useState([]);
  const [senhasFila3, setSenhasFila3] = useState([]);

  useEffect(() => {
    const fetchSenhas = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/senhas-em-curso');
        const senhas = response.data;
        setSenhasFila1(senhas.filter(senha => senha.idfila === 1));
        setSenhasFila2(senhas.filter(senha => senha.idfila === 2));
        setSenhasFila3(senhas.filter(senha => senha.idfila === 3));
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
        {senhasFila1.length === 0 ? (
          <p>Não há senhas em curso na Fila 1.</p>
        ) : (
          <ul>
            {senhasFila1.map(senha => (
              <li key={senha.idsenha}>
                Senha: {senha.numerosenha} - Setor: {senha.setor} - Estado: {senha.estado}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h2>Fila 2</h2>
        {senhasFila2.length === 0 ? (
          <p>Não há senhas em curso na Fila 2.</p>
        ) : (
          <ul>
            {senhasFila2.map(senha => (
              <li key={senha.idsenha}>
                Senha: {senha.numerosenha} - Setor: {senha.setor} - Estado: {senha.estado}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h2>Fila 3</h2>
        {senhasFila3.length === 0 ? (
          <p>Não há senhas em curso na Fila 3.</p>
        ) : (
          <ul>
            {senhasFila3.map(senha => (
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