import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function FuncionarioPage() {
  const [senhas, setSenhas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSenhas = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/ultimas-senhas-pendentes');
        setSenhas(response.data);
      } catch (error) {
        console.error('Erro ao buscar senhas:', error);
      }
    };
    fetchSenhas();
  }, []);

  const handleAvancarSenha = async (fila) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/senhas/avancar/${fila}`);
      alert('Senha avançada com sucesso!');
      setSenhas(senhas.filter(senha => senha.idsenha !== response.data.idsenha));
    } catch (error) {
      console.error('Erro ao avançar senha:', error);
      alert('Erro ao avançar senha. Tente novamente.');
    }
  };

  return (
    <div>
      <h1>Funcionário - Avançar Senha</h1>
      <div>
        <h2>Últimas 5 Senhas Pendentes</h2>
        <ul>
          {senhas.map(senha => (
            <li key={senha.idsenha}>
              Senha: {senha.numerosenha} - Setor: {senha.setor} - Estado: {senha.estado}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Fila 1</h2>
        <button onClick={() => handleAvancarSenha(1)}>Avançar Senha Fila 1</button>
      </div>
      <div>
        <h2>Fila 2</h2>
        <button onClick={() => handleAvancarSenha(2)}>Avançar Senha Fila 2</button>
      </div>
      <div>
        <h2>Fila 3</h2>
        <button onClick={() => handleAvancarSenha(3)}>Avançar Senha Fila 3</button>
      </div>
      <div style={{ position: 'fixed', right: '20px', bottom: '20px' }}>
        <button onClick={() => navigate('/acompanhamento')}>Abrir Acompanhamento</button>
      </div>
      <div style={{ position: 'fixed', left: '20px', bottom: '20px' }}>
        <button onClick={() => navigate(-1)}>Voltar</button>
      </div>
    </div>
  );
}

export default FuncionarioPage;