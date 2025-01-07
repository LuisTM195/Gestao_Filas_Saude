CREATE TABLE Utente (
    NumeroUtenteSaude INT PRIMARY KEY,
    Nome VARCHAR(100),
    CartaoCidadao VARCHAR(20),
    DataNascimento DATE,
    Telefone VARCHAR(15),
    Email VARCHAR(100),
	PalavraPass VARCHAR(18)
);

CREATE TABLE Prescricao (
    IdMedicacao INT PRIMARY KEY,
    Nome VARCHAR(100),
    Descricao VARCHAR(255),
    DataValidade DATE,
    Dosagem VARCHAR(50),
    NumeroUtenteSaude INT,
    FOREIGN KEY (NumeroUtenteSaude) REFERENCES Utente(NumeroUtenteSaude)
);

CREATE TABLE Consulta (
    ID_Consulta INT PRIMARY KEY,
	Estado VARCHAR(20),
    Data DATE,
    Hora TIME,
    NumeroUtenteSaude INT,
    IdProfissional INT,
    FOREIGN KEY (NumeroUtenteSaude) REFERENCES Utente(NumeroUtenteSaude),
    FOREIGN KEY (IdProfissional) REFERENCES ProfissionalSaude(IdProfissional)
);

CREATE TABLE ProfissionalSaude (
    IdProfissional INT PRIMARY KEY,
    Tipo VARCHAR(50),
    Especialidade VARCHAR(100),
    Nome VARCHAR(100),
    Email VARCHAR(100),
    PalavraPass VARCHAR(255)
);

CREATE TABLE Funcionario (
    IdFuncionario INT PRIMARY KEY,
    Nome VARCHAR(100),
    Cargo VARCHAR(50),
    Tipo VARCHAR(50),
    Email VARCHAR(100),
    PalavraPass VARCHAR(255)
);

CREATE TABLE Senha (
    IdSenha SERIAL PRIMARY KEY,
    NumeroSenha VARCHAR(20),
    Setor VARCHAR(50),
    Prioridade VARCHAR(20),
    QRCode VARCHAR(255),
    DataEmissao DATE,
    HoraEmissao TIME,
    HoraPrevista TIME,
    Estado VARCHAR(20),
	Fila INT,
    IdQuiosque INT,
    IdFuncionario INT,
    NumeroUtenteSaude INT,
    IdDispositivo INT,
    FOREIGN KEY (IdDispositivo) REFERENCES PainelSenhas(IdDispositivo),
    FOREIGN KEY (NumeroUtenteSaude) REFERENCES Utente(NumeroUtenteSaude),
    FOREIGN KEY (IdFuncionario) REFERENCES Funcionario(IdFuncionario)
);


CREATE TABLE PainelSenhas (
    IdDispositivo INT PRIMARY KEY,
    TipoDispositivo VARCHAR(50)
);