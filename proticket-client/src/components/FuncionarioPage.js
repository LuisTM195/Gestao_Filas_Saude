import React from 'react';
import axios from 'axios';

function FuncionarioPage() {
    const handleAvancarSenha = async (id) => {
        await axios.put(`http://localhost:5000/api/senha/avancar/${id}`);
        alert('Próxima senha avançada!');
        // Aqui você pode adicionar lógica para atualizar a lista de senhas.
    };

    return (
        <div>
            <h1>Funcionário - Avançar Senha</h1>
            {/* Adicione aqui a lógica para listar as senhas e o botão para avançar */}
        </div>
    );
}

export default FuncionarioPage;