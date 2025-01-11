import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CriarUtentePage.css'; // Certifique-se de que o arquivo CSS está sendo importado

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
    <div className="container">
      <main>
        <div className="card">
          <h2>Criar Utente</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
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
            <div className="form-group">
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
            <div className="form-group">
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
            <div className="form-group">
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
            <div className="form-group">
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
            <div className="form-group">
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
            <div className="form-group">
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
        </div>
        <button className="voltar" onClick={() => navigate(-1)}>Voltar</button>
      </main>
    </div>
  );
}

export default CriarUtentePage;