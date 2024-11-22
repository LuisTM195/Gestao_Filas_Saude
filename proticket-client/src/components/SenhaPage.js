import React, { useState } from 'react';
import axios from 'axios';

function SenhaPage() {
    const [numeroSenha, setNumeroSenha] = useState('');
    const [numeroUtenteSaude, setNumeroUtenteSaude] = useState('');
    const [idFila, setIdFila] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/api/senha', { numeroSenha, numeroUtenteSaude, idFila });
        alert('Senha solicitada com sucesso!');
        setNumeroSenha('');
        setNumeroUtenteSaude('');
        setIdFila('');
    };

    return (
        <div>
            <h1>Solicitar Senha</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Número da Senha" value={numeroSenha} onChange={(e) => setNumeroSenha(e.target.value)} required />
                <input type="text" placeholder="Número Utente Saúde" value={numeroUtenteSaude} onChange={(e) => setNumeroUtenteSaude(e.target.value)} required />
                <input type="number" placeholder="ID da Fila" value={idFila} onChange={(e) => setIdFila(e.target.value)} required />
                <button type="submit">Solicitar</button>
            </form>
        </div>
    );
}

export default SenhaPage;