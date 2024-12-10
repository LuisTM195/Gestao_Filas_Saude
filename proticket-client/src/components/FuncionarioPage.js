import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FuncionarioPage() {
  const [senhasFila1, setSenhasFila1] = useState([]);
  const [senhasFila2, setSenhasFila2] = useState([]);
  const [senhasFila3, setSenhasFila3] = useState([]);

  useEffect(() => {
    const fetchSenhas = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/ultimas-senhas-pendentes');
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

  const handleAvancarSenha = async (idFila) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/senhas/avancar/${idFila}`);
      alert('Senha avançada com sucesso!');
      if (idFila === 1) {
        setSenhasFila1(senhasFila1.filter(senha => senha.idsenha !== response.data.idsenha));
      } else if (idFila === 2) {
        setSenhasFila2(senhasFila2.filter(senha => senha.idsenha !== response.data.idsenha));
      } else if (idFila === 3) {
        setSenhasFila3(senhasFila3.filter(senha => senha.idsenha !== response.data.idsenha));
      }
    } catch (error) {
      console.error('Erro ao avançar senha:', error);
      alert('Erro ao avançar senha. Tente novamente.');
    }
  };

  return (
    <div>
      <h1>Funcionário - Avançar Senha</h1>
      <div>
        <h2>Fila 1</h2>
        <button onClick={() => handleAvancarSenha(1)}>Avançar Senha Fila 1</button>
        <ul>
          {senhasFila1.map(senha => (
            <li key={senha.idsenha}>
              Senha: {senha.numerosenha} - Setor: {senha.setor} - Estado: {senha.estado}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Fila 2</h2>
        <button onClick={() => handleAvancarSenha(2)}>Avançar Senha Fila 2</button>
        <ul>
          {senhasFila2.map(senha => (
            <li key={senha.idsenha}>
              Senha: {senha.numerosenha} - Setor: {senha.setor} - Estado: {senha.estado}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Fila 3</h2>
        <button onClick={() => handleAvancarSenha(3)}>Avançar Senha Fila 3</button>
        <ul>
          {senhasFila3.map(senha => (
            <li key={senha.idsenha}>
              Senha: {senha.numerosenha} - Setor: {senha.setor} - Estado: {senha.estado}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FuncionarioPage;