import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CriarUtentePage() {
  const [numeroUtenteSaude, setNumeroUtenteSaude] = useState('');
  const [nome, setNome] = useState('');
  const [cartaoCidadao, setCartaoCidadao] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [palavraPass, setPalavraPass] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/utentes', {
        numeroUtenteSaude,
        nome,
        cartaoCidadao,
        dataNascimento,
        telefone,
        email,
        palavraPass,
      });
      console.log('Resposta do servidor:', response.data);
      alert('Utente criado com sucesso!');
      navigate('/utente');
    } catch (error) {
      console.error('Erro ao criar utente:', error);
      alert('Erro ao criar utente. Tente novamente.');
    }
  };

  return (
    <div>
      <h1>Criar Utente</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Número Utente Saúde:
            <input
              type="number"
              value={numeroUtenteSaude}
              onChange={(e) => setNumeroUtenteSaude(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Nome:
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Cartão Cidadão:
            <input
              type="text"
              value={cartaoCidadao}
              onChange={(e) => setCartaoCidadao(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Data de Nascimento:
            <input
              type="date"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Telefone:
            <input
              type="text"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Palavra-passe:
            <input
              type="password"
              value={palavraPass}
              onChange={(e) => setPalavraPass(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Criar Utente</button>
      </form>
      <button className="voltar" onClick={() => navigate(-1)}>Voltar</button>
    </div>
  );
}

export default CriarUtentePage;