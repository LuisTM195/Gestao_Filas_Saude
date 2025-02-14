import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Logo_NO_BG.png'; // Certifique-se de que o caminho está correto
import '../App.css'; // Certifique-se de que o arquivo CSS está sendo importado

const HomePage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      const { role } = response.data;

      if (role === 'utente') {
        navigate('/utente');
      } else if (role === 'profissional') {
        navigate('/profissional');
      } else if (role === 'funcionario') {
        navigate('/funcionario');
      } else {
        alert('Role desconhecido');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao fazer login');
    }
  };

  return (
    <main>
      <div className="login-container">
        <img src={logo} alt="Logo" />
        <h1>Login</h1>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Palavra-passe:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </main>
  );
};

export default HomePage;