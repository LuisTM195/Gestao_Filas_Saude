-- Criar o schema "proticket" se ele não existir
CREATE SCHEMA IF NOT EXISTS proticket;

-- Definir o schema para as operações subsequentes
SET search_path TO proticket;

-- Tabela Utente
CREATE TABLE Utente (
    NumeroUtenteSaude VARCHAR(9) PRIMARY KEY,
    Nome VARCHAR(100),
    CartaoCidadao VARCHAR(8),
    DataNascimento DATE,
    Telefone VARCHAR(9),
    Email VARCHAR(100)
);

-- Tabela Fila
CREATE TABLE Fila (
    IdFila SERIAL PRIMARY KEY,
    DescricaoFila VARCHAR(100),
    Prioridade INT,
    Estado VARCHAR(50)
);

-- Tabela Funcionario
CREATE TABLE Funcionario (
    IdFuncionario SERIAL PRIMARY KEY,
    Nome VARCHAR(100),
    Cargo VARCHAR(50),
    Tipo VARCHAR(50),
    Telefone VARCHAR(15),
    IdFila INT,
    FOREIGN KEY (IdFila) REFERENCES Fila(IdFila)
);

-- Tabela Senha
CREATE TABLE Senha (
    IdSenha SERIAL PRIMARY KEY,
    NumeroSenha VARCHAR(50),
    QRCode VARCHAR(255),
    DataEmissao DATE,
    HoraEmissao TIME,
    Estado VARCHAR(50),
    IdFila INT,
    NumeroUtenteSaude VARCHAR(9),
    FOREIGN KEY (IdFila) REFERENCES Fila(IdFila),
    FOREIGN KEY (NumeroUtenteSaude) REFERENCES Utente(NumeroUtenteSaude)
);

-- Tabela Quiosque
CREATE TABLE Quiosque (
    IdQuiosque SERIAL PRIMARY KEY,
    IdSenha INT,
    NumeroUtenteSaude VARCHAR(9),
    FOREIGN KEY (IdSenha) REFERENCES Senha(IdSenha),
    FOREIGN KEY (NumeroUtenteSaude) REFERENCES Utente(NumeroUtenteSaude)
);

-- Tabela PainelSenhas
CREATE TABLE PainelSenhas (
    IdDispositivo SERIAL PRIMARY KEY,
    TipoDispositivo VARCHAR(50),
    NumeroUtenteSaude VARCHAR(9),
    FOREIGN KEY (NumeroUtenteSaude) REFERENCES Utente(NumeroUtenteSaude)
);