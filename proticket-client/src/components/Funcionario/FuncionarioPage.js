import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/Logo_NO_BG.png';
import './FuncionarioPage.css'; // Certifique-se de que o arquivo CSS está sendo importado

function FuncionarioPage() {
  const [senhas, setSenhas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSenhas = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/senhas/ultimas-senhas-pendentes');
        console.log('Resposta da API:', response.data); // Adicione este log para verificar a resposta da API
        if (Array.isArray(response.data)) {
          setSenhas(response.data);
        } else {
          console.error('A resposta da API não é um array:', response.data);
        }
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
      navigate('/acompanhamento'); // Redirecione para a página de acompanhamento
    } catch (error) {
      console.error('Erro ao avançar senha:', error);
      alert('Erro ao avançar senha. Tente novamente.');
    }
  };

  return (
    <div className="container">
      <img src={logo} alt="Logo" className="logo" />
      <main>
        <div className="sidebar">
          <button onClick={() => navigate('/criar-consulta')}>Criar Consulta</button>
          <button onClick={() => navigate('/consultas')}>Visualizar Consultas</button>
          <button onClick={() => navigate('/criar-utente')}>Criar Utente</button>
          <button onClick={() => navigate('/apagar-consulta')}>Apagar Consulta</button>
          <button onClick={() => navigate('/editar-consulta')}>Editar Consulta</button>
        </div>
        <div className="content">
          <div className="card">
            <h2>Últimas 5 Senhas Pendentes</h2>
            <ul>
              {senhas.map(senha => (
                <li key={senha.idsenha}>
                  Senha: {senha.numerosenha} - Setor: {senha.setor} - Estado: {senha.estado}
                </li>
              ))}
            </ul>
          </div>
          <div className="button-container">
            <button onClick={() => handleAvancarSenha(1)}>Avançar Senha Fila 1</button>
            <button onClick={() => handleAvancarSenha(2)}>Avançar Senha Fila 2</button>
            <button onClick={() => handleAvancarSenha(3)}>Avançar Senha Fila 3</button>
          </div>
          <button className="voltar" onClick={() => navigate('/')}>Voltar</button>
          <button className="acompanhamento" onClick={() => navigate('/acompanhamento')}>Abrir Acompanhamento</button>
        </div>
      </main>
    </div>
  );
}

export default FuncionarioPage;