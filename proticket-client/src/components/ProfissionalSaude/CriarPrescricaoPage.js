import React, { useState } from 'react';
import axios from 'axios';
import './CriarPrescricaoPage.css';

const CriarPrescricaoPage = () => {
  const [utenteNumber, setUtenteNumber] = useState('');
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [dataValidade, setDataValidade] = useState('');
  const [dosagem, setDosagem] = useState('');

  const handleCreate = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/prescricoes', {
        numeroUtenteSaude: utenteNumber,
        nome,
        descricao,
        dataValidade,
        dosagem,
      });
      alert('Prescrição criada com sucesso!');
    } catch (error) {
      console.error('Erro ao criar prescrição:', error);
      alert('Erro ao criar prescrição. Tente novamente.');
    }
  };

  return (
    <div className="container">
      <h1>Criar Prescrição</h1>
      <div className="form-container">
        <input
          type="text"
          placeholder="Número de Utente"
          value={utenteNumber}
          onChange={(e) => setUtenteNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <input
          type="date"
          placeholder="Data de Validade"
          value={dataValidade}
          onChange={(e) => setDataValidade(e.target.value)}
        />
        <input
          type="text"
          placeholder="Dosagem"
          value={dosagem}
          onChange={(e) => setDosagem(e.target.value)}
        />
        <button onClick={handleCreate}>Criar Prescrição</button>
      </div>
    </div>
  );
};

export default CriarPrescricaoPage;