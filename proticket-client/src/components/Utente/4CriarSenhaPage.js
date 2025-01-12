import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './4CriarSenhaPage.css'; // Certifique-se de que o arquivo CSS está sendo importado

function CriarSenhaPage4() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const setor = queryParams.get('setor');
  const [prioridade, setPrioridade] = useState('normal');
  const [mostrarAviso, setMostrarAviso] = useState(false);

  useEffect(() => {
    if (setor === 'Consulta Doença Aguda') {
      handleSubmit();
    }
  }, [setor]);

  const handlePrioridadeChange = (e) => {
    const novaPrioridade = e.target.value;
    setPrioridade(novaPrioridade);
    if (novaPrioridade === 'alta') {
      setMostrarAviso(true);
    } else {
      setMostrarAviso(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/senhas', {
        numeroUtenteSaude: null,
        admissaoBalcao: true,
        setor,
        prioridade: setor === 'Consulta Doença Aguda' ? 'alta' : prioridade,
      });
      console.log('Resposta do servidor:', response.data);
      alert('Senha criada com sucesso!');
      navigate('/imprimir-senha', { state: { senha: response.data } });
    } catch (error) {
      console.error('Erro ao criar senha:', error);
      alert('Erro ao criar senha. Tente novamente.');
    }
  };

  return (
    <div className="container">
      <main>
        <div className="card">
          <h2>Escolha a Prioridade</h2>
          <p>Setor: {setor}</p>
          <form onSubmit={(e) => e.preventDefault()}>
            {setor !== 'Consulta Doença Aguda' && (
              <div className="form-group">
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
            <button type="button" onClick={handleSubmit}>Gerar Senha</button>
          </form>
        </div>
        <button className="voltar" onClick={() => navigate(-1)}>Voltar</button>
      </main>
    </div>
  );
}

export default CriarSenhaPage4;