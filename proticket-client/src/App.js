import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import UtentePage from './components/UtentePage';
import ProfissionalPage from './components/ProfissionalPage';
import FuncionarioPage from './components/FuncionarioPage';
import CriarSenhaPage from './components/CriarSenhaPage';
import ConsultasPage from './components/ConsultasPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/utente" element={<UtentePage />} />
        <Route path="/profissional" element={<ProfissionalPage />} />
        <Route path="/funcionario" element={<FuncionarioPage />} />
        <Route path="/criar-senha" element={<CriarSenhaPage />} />
        <Route path="/consultas" element={<ConsultasPage />} />
      </Routes>
    </Router>
  );
};

export default App;