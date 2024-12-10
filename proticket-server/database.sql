
select* from utente
-- Tabela: Utente
CREATE TABLE Utente (
    NumeroUtenteSaude INT PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    CartaoCidadao VARCHAR(20) NOT NULL,
    DataNascimento DATE NOT NULL,
    Telefone VARCHAR(15),
    Email VARCHAR(100)
);

-- Tabela: Medicacao
CREATE TABLE Medicacao (
    IdMedicacao INT PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    Descricao TEXT,
    NumeroUtenteSaude INT,
    FOREIGN KEY (NumeroUtenteSaude) REFERENCES Utente(NumeroUtenteSaude)
);

-- Tabela: PainelSenhas
CREATE TABLE PainelSenhas (
    IdDispositivo INT PRIMARY KEY,
    TipoDispositivo VARCHAR(50),
    NumeroUtenteSaude INT,
    FOREIGN KEY (NumeroUtenteSaude) REFERENCES Utente(NumeroUtenteSaude)
);

-- Tabela Senha
CREATE TABLE Senha (
    IdSenha SERIAL PRIMARY KEY,
    NumeroSenha VARCHAR(50),
    Setor VARCHAR(50),
    QRCode VARCHAR(255),
    DataEmissao DATE,
    HoraEmissao TIME,
    Estado VARCHAR(50),
    IdFila INT,
    NumeroUtenteSaude INT,
    FOREIGN KEY (IdFila) REFERENCES Fila(IdFila),
    FOREIGN KEY (NumeroUtenteSaude) REFERENCES Utente(NumeroUtenteSaude)
);

-- Tabela: Fila
CREATE TABLE Fila (
    IdFila INT PRIMARY KEY,
    DescricaoFila VARCHAR(100) NOT NULL,
    Prioridade INT NOT NULL,
    Estado VARCHAR(50)
);

-- Tabela: Funcionario
CREATE TABLE Funcionario (
    IdFuncionario INT PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    Cargo VARCHAR(50),
    Tipo VARCHAR(50),
    Telefone VARCHAR(15),
    IdFila INT,
    FOREIGN KEY (IdFila) REFERENCES Fila(IdFila)
);

-- Tabela: Quiosque
CREATE TABLE Quiosque (
    IdQuiosque INT PRIMARY KEY,
    IdSenha INT,
    NumeroUtenteSaude INT,
    FOREIGN KEY (IdSenha) REFERENCES Senha(IdSenha),
    FOREIGN KEY (NumeroUtenteSaude) REFERENCES Utente(NumeroUtenteSaude)
);

-- Tabela: Consulta
CREATE TABLE Consulta (
    IdConsulta INT PRIMARY KEY,
    TipoDispositivo VARCHAR(50),
    Data DATE NOT NULL,
    Hora TIME NOT NULL,
    NumeroUtenteSaude INT,
    FOREIGN KEY (NumeroUtenteSaude) REFERENCES Utente(NumeroUtenteSaude)
);

-- Tabela: Enfermeiro
CREATE TABLE Enfermeiro (
    IdEnfermeiro INT PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    Telefone VARCHAR(15)
);