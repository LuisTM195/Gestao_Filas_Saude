import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import UtentePage from './components/Utente/UtentePage';
import ProfissionalPage from './components/ProfissionalSaude/ProfissionalPage';
import FuncionarioPage from './components/Funcionario/FuncionarioPage'; // Certifique-se de que o caminho está correto
import CriarSenhaPage from './components/Utente/1CriarSenhaPage';
import CriarSenhaPage2 from './components/Utente/2CriarSenhaPage';
import CriarSenhaPage3 from './components/Utente/3CriarSenhaPage';
import CriarSenhaPage4 from './components/Utente/4CriarSenhaPage';
import ImprimirSenhaPage from './components/Utente/ImprimirSenhaPage';
import ConsultasPage from './components/Utente/ConsultasPage';
import AcompanhamentoPage from './components/Funcionario/AcompanhamentoPage';
import CriarConsultaPage from './components/ProfissionalSaude/CriarConsultaPage';
import ApagarConsultaPage from './components/ProfissionalSaude/ApagarConsultaPage';
import EditarConsultaPage from './components/ProfissionalSaude/EditarConsultaPage';
import CriarUtentePage from './components/Utente/CriarUtentePage';
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
            <Route path="/funcionario" element={<FuncionarioPage />} /> {/* Certifique-se de que esta rota está correta */}
            <Route path="/1CriarSenhaPage" element={<CriarSenhaPage />} />
            <Route path="/2CriarSenhaPage" element={<CriarSenhaPage2 />} />
            <Route path="/3CriarSenhaPage" element={<CriarSenhaPage3 />} />
            <Route path="/4CriarSenhaPage" element={<CriarSenhaPage4 />} />
            <Route path="/imprimir-senha" element={<ImprimirSenhaPage />} />
            <Route path="/consultas" element={<ConsultasPage />} />
            <Route path="/acompanhamento" element={<AcompanhamentoPage />} />
            <Route path="/criar-consulta" element={<CriarConsultaPage />} />
            <Route path="/apagar-consulta" element={<ApagarConsultaPage />} />
            <Route path="/editar-consulta" element={<EditarConsultaPage />} />
            <Route path="/criar-utente" element={<CriarUtentePage />} />
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