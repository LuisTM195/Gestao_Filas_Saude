import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import UtentePage from './components/Utente/UtentePage';
import ProfissionalPage from './components/ProfissionalSaude/ProfissionalPage';
import FuncionarioPage from './components/Funcionario/FuncionarioPage';
import CriarSenhaPage from './components/Utente/CriarSenhaPage';
import ConsultasPage from './components/Utente/ConsultasPage';
import AcompanhamentoPage from './components/Funcionario/AcompanhamentoPage';
import CriarConsulta from './components/ProfissionalSaude/CriarConsultaPage';
import ApagarConsultaPage from './components/ProfissionalSaude/ApagarConsultaPage';
import EditarConsultaPage from './components/ProfissionalSaude/EditarConsultaPage';

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
        <Route path="/acompanhamento" element={<AcompanhamentoPage />} />
        <Route path="/criar-consulta" element={<CriarConsulta />} />
        <Route path="/apagar-consulta" element={<ApagarConsultaPage />} />
        <Route path="/editar-consulta" element={<EditarConsultaPage />} />
      </Routes>
    </Router>
  );
};

export default App;