import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import UtentePage from './components/Utente/UtentePage';
import ProfissionalPage from './components/ProfissionalSaude/ProfissionalPage';
import FuncionarioPage from './components/Funcionario/FuncionarioPage';
import CriarSenhaPage from './components/Utente/CriarSenhaPage';
import ConsultasPage from './components/Utente/ConsultasPage';
import AcompanhamentoPage from './components/Funcionario/AcompanhamentoPage';
import CriarConsultaPage from './components/ProfissionalSaude/CriarConsultaPage';
import ApagarConsultaPage from './components/ProfissionalSaude/ApagarConsultaPage';
import EditarConsultaPage from './components/ProfissionalSaude/EditarConsultaPage';
import snsLogo from './assets/Símbolo_do_SNS.png'; // Certifique-se de que o caminho está correto
import './App.css'; // Certifique-se de que o caminho está correto

const App = () => {
  return (
    <div>
      <header></header>
      <main>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/utente" element={<UtentePage />} />
            <Route path="/profissional" element={<ProfissionalPage />} />
            <Route path="/funcionario" element={<FuncionarioPage />} />
            <Route path="/criar-senha" element={<CriarSenhaPage />} />
            <Route path="/consultas" element={<ConsultasPage />} />
            <Route path="/acompanhamento" element={<AcompanhamentoPage />} />
            <Route path="/criar-consulta" element={<CriarConsultaPage />} />
            <Route path="/apagar-consulta" element={<ApagarConsultaPage />} />
            <Route path="/editar-consulta" element={<EditarConsultaPage />} />
          </Routes>
        </Router>
      </main>
      <footer>
        <span>© 2025 ProtTicket</span>
        <img src={snsLogo} alt="Símbolo do SNS" />
      </footer>
    </div>
  );
};

export default App;