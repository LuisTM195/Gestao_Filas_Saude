const express = require('express');
const router = express.Router();
const pool = require('./db');
const fs = require('fs');
const path = require('path');
const { getAuthUrl, getAccessToken, loadAccessToken } = require('../proticket-client/googleAuth');
const { createEvent } = require('../proticket-client/googleCalendar');

//-------------SENHAS-------------------
// Caminho para o arquivo que armazena o último número de senha
const ultimoNumeroSenhaPath = path.join(__dirname, 'ultimoNumeroSenha.json');

// Função para ler o último número de senha do arquivo
function lerUltimoNumeroSenha() {
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
  return `${setor}-${novoNumero}`;
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
  try {
    const numeroSenha = gerarNumeroSenha(setor); // Gerar um número de senha conforme a especificação
    const dataEmissao = new Date().toISOString().split('T')[0];
    const horaEmissao = new Date().toISOString().split('T')[1].split('.')[0];
    const estado = 'pendente';
    const prioridade = determinarPrioridade(admissaoBalcao); // Determinar a prioridade com base na opção selecionada
    const qrCode = `QR${numeroSenha}`; // Gerar um QRCode único

    console.log('Dados recebidos:', {
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

// Rota para avançar uma senha de uma fila específica
router.put('/senhas/avancar/:fila', async (req, res) => {
  const { fila } = req.params;
  try {
    // Atualizar a senha "em curso" para "expirada"
    await pool.query(
      'UPDATE public.Senha SET Estado = $1 WHERE Estado = $2',
      ['expirada', 'em curso']
    );

    // Selecionar a próxima senha pendente
    const senhaPendente = await pool.query(
      'SELECT * FROM public.Senha WHERE Estado = $1 ORDER BY DataEmissao, HoraEmissao LIMIT 1',
      ['pendente']
    );

    if (senhaPendente.rows.length === 0) {
      return res.status(404).send('Nenhuma senha pendente encontrada');
    }

    const senhaId = senhaPendente.rows[0].idsenha;

    // Atualizar a próxima senha pendente para "em curso" e associar à fila
    const senhaAvancada = await pool.query(
      'UPDATE public.Senha SET Estado = $1, Fila = $2 WHERE IdSenha = $3 RETURNING *',
      ['em curso', fila, senhaId]
    );

    res.json(senhaAvancada.rows[0]);
  } catch (err) {
    console.error('Erro ao avançar senha:', err.message);
    res.status(500).send('Erro ao avançar senha');
  }
});

// Rota para obter as últimas 5 senhas pendentes
router.get('/ultimas-senhas-pendentes', async (req, res) => {
  try {
    const ultimasSenhasPendentes = await pool.query(`
      SELECT * FROM public.Senha
      WHERE Estado = 'pendente'
      ORDER BY DataEmissao DESC, HoraEmissao DESC
      LIMIT 5
    `);
    res.json(ultimasSenhasPendentes.rows);
  } catch (err) {
    console.error('Erro ao buscar últimas senhas pendentes:', err.message);
    res.status(500).send('Erro ao buscar últimas senhas pendentes');
  }
});

// Rota para obter senhas em curso
router.get('/senhas-em-curso', async (req, res) => {
  try {
    const senhasEmCurso = await pool.query(
      'SELECT * FROM public.Senha WHERE Estado = $1 ORDER BY DataEmissao DESC, HoraEmissao DESC',
      ['em curso']
    );
    res.json(senhasEmCurso.rows);
  } catch (err) {
    console.error('Erro ao buscar senhas em curso:', err.message);
    res.status(500).send('Erro ao buscar senhas em curso');
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
// Rota para redirecionar o usuário para a URL de autenticação
router.get('/auth/google', (req, res) => {
  const authUrl = getAuthUrl();
  res.redirect(authUrl);
});

// Rota para receber o código de autenticação e obter o token de acesso
router.get('/auth/google/callback', async (req, res) => {
  const code = req.query.code;
  try {
    await getAccessToken(code);
    res.send('Autenticação bem-sucedida! Você pode fechar esta janela.');
  } catch (error) {
    console.error('Erro ao obter o token de acesso:', error);
    res.status(500).send('Erro ao obter o token de acesso.');
  }
});

// Carregar o token de acesso ao iniciar o servidor
loadAccessToken();

// Rota para criar uma nova consulta
router.post('/consultas', async (req, res) => {
  const { data, hora, numeroUtenteSaude, idProfissional } = req.body;
  try {
    const novaConsulta = await pool.query(
      'INSERT INTO public.Consulta (Data, Hora, NumeroUtenteSaude, IdProfissional) VALUES ($1, $2, $3, $4) RETURNING *',
      [data, hora, numeroUtenteSaude, idProfissional]
    );

    // Criar evento no Google Calendar
    const event = {
      summary: 'Consulta Médica',
      description: `Consulta com o profissional de saúde ID: ${idProfissional}`,
      start: {
        dateTime: `${data}T${hora}:00`,
        timeZone: 'America/Sao_Paulo',
      },
      end: {
        dateTime: `${data}T${hora + 1}:00`, // Supondo que a consulta dure 1 hora
        timeZone: 'America/Sao_Paulo',
      },
    };
    await createEvent(event);

    res.json(novaConsulta.rows[0]);
  } catch (err) {
    console.error('Erro ao criar consulta:', err.message);
    res.status(500).send('Erro ao criar consulta');
  }
});

module.exports = router;