import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CriarSenhaPage() {
  const [setor, setSetor] = useState('');
  const [numeroUtente, setNumeroUtente] = useState('');
  const [admissaoBalcao, setAdmissaoBalcao] = useState(false);
  const [prioridade, setPrioridade] = useState('normal');
  const [mostrarAviso, setMostrarAviso] = useState(false);
  const navigate = useNavigate();

  const handleSetorChange = (e) => {
    setSetor(e.target.value);
  };

  const handleNumeroUtenteChange = (e) => {
    setNumeroUtente(e.target.value);
  };

  const handleAdmissaoBalcaoChange = (e) => {
    setAdmissaoBalcao(e.target.checked);
    if (!e.target.checked) {
      setPrioridade('normal');
      setMostrarAviso(false);
    }
  };

  const handlePrioridadeChange = (e) => {
    const novaPrioridade = e.target.value;
    setPrioridade(novaPrioridade);
    if (novaPrioridade === 'alta') {
      setMostrarAviso(true);
    } else {
      setMostrarAviso(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!setor) {
      alert('Por favor, selecione uma opção.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/senhas', {
        numeroUtenteSaude: admissaoBalcao ? null : numeroUtente,
        admissaoBalcao,
        setor,
        prioridade: admissaoBalcao ? prioridade : 'normal',
      });
      console.log('Resposta do servidor:', response.data);
      alert('Senha criada com sucesso!');
      navigate('/');
    } catch (error) {
      console.error('Erro ao criar senha:', error);
      alert('Erro ao criar senha. Tente novamente.');
    }
  };

  return (
    <div>
      <h1>Criar Senha</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <input
              type="radio"
              value="Admissão"
              checked={setor === 'Admissão'}
              onChange={handleSetorChange}
            />
            Admissão
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="Consulta Doença Aguda"
              checked={setor === 'Consulta Doença Aguda'}
              onChange={handleSetorChange}
            />
            Consulta Doença Aguda
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="Marcação"
              checked={setor === 'Marcação'}
              onChange={handleSetorChange}
            />
            Marcação
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="Renovação de Medicação Habitual"
              checked={setor === 'Renovação de Medicação Habitual'}
              onChange={handleSetorChange}
            />
            Renovação de Medicação Habitual
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="Outros Assuntos"
              checked={setor === 'Outros Assuntos'}
              onChange={handleSetorChange}
            />
            Outros Assuntos
          </label>
        </div>
        <div>
          <label>
            Número de Utente de Saúde:
            <input
              type="text"
              value={numeroUtente}
              onChange={handleNumeroUtenteChange}
              disabled={admissaoBalcao}
            />
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={admissaoBalcao}
              onChange={handleAdmissaoBalcaoChange}
            />
            Admissão ao Balcão (sem número de utente de saúde)
          </label>
        </div>
        {admissaoBalcao && (
          <div>
            <label>
              Prioridade:
              <select value={prioridade} onChange={handlePrioridadeChange}>
                <option value="normal">Normal</option>
                <option value="alta">Alta</option>
              </select>
            </label>
            {mostrarAviso && (
              <p style={{ color: 'red' }}>
                Pode ser solicitado documento comprovativo de incapacidade
              </p>
            )}
          </div>
        )}
        <button type="submit">Criar Senha</button>
      </form>
      <button className="voltar" onClick={() => navigate(-1)}>Voltar</button>
    </div>
  );
}

export default CriarSenhaPage;