import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/Logo_NO_BG.png';
import publicidade from '../../assets/publicidade.jpg';
import './AcompanhamentoPage.css';

const AcompanhamentoPage = () => {
  const [senhasEmCurso, setSenhasEmCurso] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSenhas = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/senhas-em-curso');
        console.log('Resposta da API:', response.data); // Adicione este log para verificar a resposta da API
        if (Array.isArray(response.data)) {
          setSenhasEmCurso(response.data);
        } else {
          console.error('A resposta da API não é um array:', response.data);
        }
      } catch (error) {
        console.error('Erro ao buscar senhas:', error);
      }
    };
    fetchSenhas();
  }, []);

  return (
    <div className="container">
      <img src={logo} alt="Logo" className="logo" />
      <main>
        <div className="content">
          <div className="card">
            <h2>Acompanhar Senhas</h2>
            <div className="fila">
              <h3>Fila 1</h3>
              {senhasEmCurso.filter(senha => senha.fila === 1).length === 0 ? (
                <p>Não há senhas em curso na Fila 1.</p>
              ) : (
                <ul>
                  {senhasEmCurso.filter(senha => senha.fila === 1).map(senha => (
                    <li key={senha.idsenha}>
                      Senha: {senha.numerosenha} - Estado: {senha.estado}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="fila">
              <h3>Fila 2</h3>
              {senhasEmCurso.filter(senha => senha.fila === 2).length === 0 ? (
                <p>Não há senhas em curso na Fila 2.</p>
              ) : (
                <ul>
                  {senhasEmCurso.filter(senha => senha.fila === 2).map(senha => (
                    <li key={senha.idsenha}>
                      Senha: {senha.numerosenha} - Estado: {senha.estado}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="fila">
              <h3>Fila 3</h3>
              {senhasEmCurso.filter(senha => senha.fila === 3).length === 0 ? (
                <p>Não há senhas em curso na Fila 3.</p>
              ) : (
                <ul>
                  {senhasEmCurso.filter(senha => senha.fila === 3).map(senha => (
                    <li key={senha.idsenha}>
                      Senha: {senha.numerosenha} - Estado: {senha.estado}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <button className="voltar" onClick={() => navigate(-1)}>Voltar</button>
        </div>
        <div className="publicidade">
          <h3>Publicidade</h3>
          <img src={publicidade} alt="Publicidade" />
        </div>
      </main>
    </div>
  );
};

export default AcompanhamentoPage;