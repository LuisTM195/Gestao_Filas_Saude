const express = require('express');
const router = express.Router();
const pool = require('./db');
const fs = require('fs');
const path = require('path');
const { createEvent } = require('./googleCalendar');
const { listEvents } = require('./googleCalendar');
const { getAuthUrl } = require('./googleAuth'); // Certifique-se de que o caminho está correto

//-------------SENHAS-------------------
// Caminho para o arquivo que armazena o último número de senha
const ultimoNumeroSenhaPath = path.join(__dirname, 'ultimoNumeroSenha.json');

// Função para ler o último número de senha do arquivo
function lerUltimoNumeroSenha() {
  if (!fs.existsSync(ultimoNumeroSenhaPath)) {
    escreverUltimoNumeroSenha(0);
  }
  const data = fs.readFileSync(ultimoNumeroSenhaPath, 'utf8');
  const json = JSON.parse(data);
  return json.ultimoNumero;
}

// Função para escrever o último número de senha no arquivo
function escreverUltimoNumeroSenha(numero) {
  const json = { ultimoNumero: numero };
  fs.writeFileSync(ultimoNumeroSenhaPath, JSON.stringify(json), 'utf8');
}

// Função para gerar um número de senha com prefixo
function gerarNumeroSenha(setor) {
  const ultimoNumero = lerUltimoNumeroSenha();
  const novoNumero = ultimoNumero + 1;
  escreverUltimoNumeroSenha(novoNumero);

  let prefixo;
  switch (setor) {
    case 'Admissão':
      prefixo = 'A';
      break;
    case 'Consulta Doença Aguda':
      prefixo = 'U';
      break;
    case 'Marcação':
      prefixo = 'M';
      break;
    case 'Renovação de Medicação Habitual':
      prefixo = 'R';
      break;
    case 'Outros Assuntos':
      prefixo = 'O';
      break;
    default:
      prefixo = 'X'; // Prefixo padrão caso o setor não seja reconhecido
  }

  const numeroSenha = `${prefixo}${novoNumero}`;
  console.log(`Gerando número de senha: ${numeroSenha}`); // Adicione um log para depuração
  return numeroSenha;
}

// Função para determinar a prioridade com base na opção selecionada
function determinarPrioridade(admissaoBalcao) {
  return admissaoBalcao ? 'alta' : 'normal';
}

// Rota para obter todas as senhas
router.get('/senhas', async (req, res) => {
  try {
    const todasSenhas = await pool.query('SELECT * FROM public.Senha');
    res.json(todasSenhas.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Rota para criar uma nova senha
router.post('/senhas', async (req, res) => {
  const { numeroUtenteSaude, admissaoBalcao, setor } = req.body;
  console.log('Recebendo requisição para criar senha:', req.body); // Adicione um log para depuração
  try {
    const numeroSenha = gerarNumeroSenha(setor); // Gerar um número de senha conforme a especificação
    const dataEmissao = new Date().toISOString().split('T')[0];
    const horaEmissao = new Date().toISOString().split('T')[1].split('.')[0];
    const estado = 'pendente';
    const prioridade = determinarPrioridade(admissaoBalcao); // Determinar a prioridade com base na opção selecionada
    const qrCode = `QR${numeroSenha}`; // Gerar um QRCode único

    console.log('Dados para inserção no banco de dados:', {
      numeroUtenteSaude,
      admissaoBalcao,
      setor,
      numeroSenha,
      qrCode,
      dataEmissao,
      horaEmissao,
      estado,
      prioridade
    });

    const novaSenha = await pool.query(
      'INSERT INTO public.Senha (NumeroSenha, Setor, QRCode, DataEmissao, HoraEmissao, Estado, Prioridade, NumeroUtenteSaude) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [numeroSenha, setor, qrCode, dataEmissao, horaEmissao, estado, prioridade, numeroUtenteSaude]
    );
    console.log('Senha criada:', novaSenha.rows[0]);
    res.json(novaSenha.rows[0]);
  } catch (err) {
    console.error('Erro ao criar senha:', err.message);
    res.status(500).send('Erro ao criar senha');
  }
});







//-------------------UTENTES-------------------------
// Rota para criar um novo utente
router.post('/utentes', async (req, res) => {
  const { numeroUtenteSaude, nome, cartaoCidadao, dataNascimento, telefone, email, palavraPass } = req.body;

  try {
    console.log('Dados recebidos:', {
      numeroUtenteSaude,
      nome,
      cartaoCidadao,
      dataNascimento,
      telefone,
      email,
      palavraPass
    });

    const query = `
      INSERT INTO Utente (NumeroUtenteSaude, Nome, CartaoCidadao, DataNascimento, Telefone, Email, PalavraPass)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    const values = [numeroUtenteSaude, nome, cartaoCidadao, dataNascimento, telefone, email, palavraPass];

    console.log('Executando consulta SQL:', query);
    console.log('Com valores:', values);

    const newUtente = await pool.query(query, values);

    console.log('Utente criado:', newUtente.rows[0]);
    res.status(201).json(newUtente.rows[0]);
  } catch (err) {
    console.error('Erro ao criar utente:', err.message);
    res.status(500).send('Erro ao criar utente');
  }
});



//------------------LOGIN-----------------------
// Rota para login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verifique se o usuário é um utente
    const utenteResult = await pool.query('SELECT * FROM Utente WHERE Email = $1 AND PalavraPass = $2', [email, password]);
    if (utenteResult.rows.length > 0) {
      return res.json({ role: 'utente' });
    }

    // Verifique se o usuário é um profissional de saúde
    const profissionalResult = await pool.query('SELECT * FROM ProfissionalSaude WHERE Email = $1 AND PalavraPass = $2', [email, password]);
    if (profissionalResult.rows.length > 0) {
      return res.json({ role: 'profissional' });
    }

    // Verifique se o usuário é um funcionário
    const funcionarioResult = await pool.query('SELECT * FROM Funcionario WHERE Email = $1 AND PalavraPass = $2', [email, password]);
    if (funcionarioResult.rows.length > 0) {
      return res.json({ role: 'funcionario' });
    }

    // Se o email não for encontrado em nenhuma tabela
    res.status(401).send('Email ou palavra-passe incorretos');
  } catch (err) {
    console.error('Erro ao fazer login:', err.message);
    res.status(500).send('Erro ao fazer login');
  }
});




//-------------------CONSULTAS----------------------------
// Rota para buscar consultas por NumeroUtenteSaude
router.get('/consultas/:numeroUtenteSaude', async (req, res) => {
  const { numeroUtenteSaude } = req.params;
  try {
    const result = await pool.query('SELECT * FROM Consulta WHERE NumeroUtenteSaude = $1', [numeroUtenteSaude]);
    console.log(result.rows); // Verifique os dados retornados
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao buscar consultas:', err.message);
    res.status(500).send('Erro ao buscar consultas');
  }
});


// Rota para criar uma nova consulta
router.post('/consultas', async (req, res) => {
  const { data, hora, numeroUtenteSaude, idProfissional } = req.body;
  const estado = 'Pendente'; // Defina o estado como "Pendente"
  console.log('Dados recebidos:', req.body); // Adicione este log para verificar os dados recebidos
  try {
    const novaConsulta = await pool.query(
      'INSERT INTO Consulta (Estado, Data, Hora, NumeroUtenteSaude, IdProfissional) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [estado, data, hora, numeroUtenteSaude, idProfissional]
    );
    res.json(novaConsulta.rows[0]);
  } catch (err) {
    console.error('Erro ao criar consulta:', err.message);
    res.status(500).send('Erro ao criar consulta');
  }
});

// Rota para editar uma consulta
router.put('/consultas/:id', async (req, res) => {
  const { id } = req.params;
  const { estado, data, hora, numeroUtenteSaude, idProfissional } = req.body;
  try {
    await pool.query(
      'UPDATE Consulta SET Estado = $1, Data = $2, Hora = $3, NumeroUtenteSaude = $4, IdProfissional = $5 WHERE IdConsulta = $6',
      [estado, data, hora, numeroUtenteSaude, idProfissional, id]
    );
    res.send('Consulta editada com sucesso!');
  } catch (err) {
    console.error('Erro ao editar consulta:', err.message);
    res.status(500).send('Erro ao editar consulta');
  }
});

// Rota para apagar uma consulta
router.delete('/consultas/:idConsulta', async (req, res) => {
  const { idConsulta } = req.params;
  try {
    await pool.query('DELETE FROM Consulta WHERE IdConsulta = $1', [idConsulta]);
    res.send('Consulta apagada com sucesso!');
  } catch (err) {
    console.error('Erro ao apagar consulta:', err.message);
    res.status(500).send('Erro ao apagar consulta');
  }
});






//-------------------GOOGLE-------------------------
// Rota para listar eventos do Google Calendar
router.get('/google-calendar/events', async (req, res) => {
  try {
    const events = await listEvents();
    res.json(events);
  } catch (err) {
    console.error('Erro ao listar eventos do Google Calendar:', err.message);
    res.status(500).send('Erro ao listar eventos do Google Calendar');
  }
});


// Rota para obter a URL de autenticação do Google
router.get('/google-calendar/auth-url', (req, res) => {
  try {
    const authUrl = getAuthUrl();
    res.json({ authUrl });
  } catch (err) {
    console.error('Erro ao obter URL de autenticação do Google:', err.message);
    res.status(500).send('Erro ao obter URL de autenticação do Google');
  }
});


// Rota para receber o código de autenticação e obter o token de acesso
router.get('/google-calendar/callback', async (req, res) => {
  const code = req.query.code;
  try {
    const tokens = await getAccessToken(code);
    res.redirect(`http://localhost:3000/profissional?tokens=${JSON.stringify(tokens)}`);
  } catch (err) {
    console.error('Erro ao obter token de acesso do Google:', err.message);
    res.status(500).send('Erro ao obter token de acesso do Google');
  }
});

// Rota para criar um evento no Google Calendar
router.post('/google-calendar/create-event', async (req, res) => {
  const { summary, description, start, end, tokens } = req.body;

  const event = {
    summary,
    description,
    start: {
      dateTime: start,
      timeZone: 'America/Sao_Paulo', // Ajuste o fuso horário conforme necessário
    },
    end: {
      dateTime: end,
      timeZone: 'America/Sao_Paulo', // Ajuste o fuso horário conforme necessário
    },
  };

  try {
    const oAuth2Client = new google.auth.OAuth2();
    oAuth2Client.setCredentials(JSON.parse(tokens));
    const createdEvent = await createEvent(event, oAuth2Client);
    res.json(createdEvent);
  } catch (err) {
    console.error('Erro ao criar evento no Google Calendar:', err.message);
    res.status(500).send('Erro ao criar evento no Google Calendar');
  }
});

module.exports = router;