import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AcompanhamentoPage() {
    const [senhas, setSenhas] = useState([]);

    useEffect(() => {
        const fetchSenhas = async () => {
            const response = await axios.get('http://localhost:5000/api/senhas');
            setSenhas(response.data);
        };
        fetchSenhas();
    }, []);

    return (
        <div>
            <h1>Acompanhamento de Senhas</h1>
            <ul>
                {senhas.map(senha => (
                    <li key={senha.IdSenha}>{senha.NumeroSenha} - {senha.Estado}</li>
                ))}
            </ul>
        </div>
    );
}

export default AcompanhamentoPage;