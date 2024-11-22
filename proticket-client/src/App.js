import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Alterado para usar Routes
import SenhaPage from './components/SenhaPage';
import AcompanhamentoPage from './components/AcompanhamentoPage';
import FuncionarioPage from './components/FuncionarioPage';

function App() {
    return (
        <Router>
            <Routes> {/* Alterado de Switch para Routes */}
                <Route path="/" element={<SenhaPage />} /> {/* Alterado de component para element */}
                <Route path="/acompanhamento" element={<AcompanhamentoPage />} />
                <Route path="/funcionario" element={<FuncionarioPage />} />
            </Routes>
        </Router>
    );
}

export default App;