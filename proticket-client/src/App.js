import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CriarSenhaPage from './components/CriarSenhaPage';
import FuncionarioPage from './components/FuncionarioPage';
import AcompanhamentoPage from './components/AcompanhamentoPage';
import DetalhesSenhaPage from './components/DetalhesSenhaPage';
import HomePage from './components/HomePage'; // Importe o componente da homepage

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Defina a rota para a homepage */}
        <Route path="/criar-senha" element={<CriarSenhaPage />} />
        <Route path="/funcionario" element={<FuncionarioPage />} />
        <Route path="/acompanhar-senhas" element={<AcompanhamentoPage />} />
        <Route path="/detalhes-senha" element={<DetalhesSenhaPage />} />
      </Routes>
    </Router>
  );
}

export default App;