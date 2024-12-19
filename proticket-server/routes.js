const express = require('express');
const router = express.Router();
const pool = require('./db');
const fs = require('fs');
const path = require('path');

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
  let ultimoNumero = lerUltimoNumeroSenha();
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
      prefixo = 'A'; // Valor padrão
  }

  return `${prefixo}${novoNumero}`;
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
  const { numeroUtenteSaude, admissaoBalcao, setor, prioridade } = req.body;
  try {
    const numeroSenha = gerarNumeroSenha(setor); // Gerar um número de senha conforme a especificação
    const dataEmissao = new Date().toISOString().split('T')[0];
    const horaEmissao = new Date().toISOString().split('T')[1].split('.')[0];
    const estado = 'pendente';
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
router.put('/senhas/avancar/:idFila', async (req, res) => {
  const { idFila } = req.params;
  try {
    // Atualizar a senha "em curso" para "expirada"
    await pool.query(
      'UPDATE public.Senha SET Estado = $1 WHERE Estado = $2 AND IdFila = $3',
      ['expirada', 'em curso', idFila]
    );

    // Selecionar a próxima senha pendente
    const senhaPendente = await pool.query(
      'SELECT * FROM public.Senha WHERE Estado = $1 AND IdFila = $2 ORDER BY DataEmissao, HoraEmissao LIMIT 1',
      ['pendente', idFila]
    );

    if (senhaPendente.rows.length === 0) {
      return res.status(404).send('Nenhuma senha pendente encontrada para a fila especificada');
    }

    const senhaId = senhaPendente.rows[0].idsenha;

    // Atualizar a próxima senha pendente para "em curso"
    const senhaAvancada = await pool.query(
      'UPDATE public.Senha SET Estado = $1 WHERE IdSenha = $2 RETURNING *',
      ['em curso', senhaId]
    );

    res.json(senhaAvancada.rows[0]);
  } catch (err) {
    console.error('Erro ao avançar senha:', err.message);
    res.status(500).send('Erro ao avançar senha');
  }
});

// Rota para obter as últimas 5 senhas pendentes de cada fila
router.get('/ultimas-senhas-pendentes', async (req, res) => {
  try {
    const ultimasSenhasPendentes = await pool.query(`
      SELECT * FROM (
        SELECT *, ROW_NUMBER() OVER (PARTITION BY IdFila ORDER BY DataEmissao DESC, HoraEmissao DESC) AS rn
        FROM public.Senha
        WHERE Estado = 'pendente'
      ) sub
      WHERE rn <= 5
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


// Rota para obter todas as consultas de um utente específico
router.get('/consultas/:numeroUtente', async (req, res) => {
  const { numeroUtente } = req.params;
  try {
    const consultas = await pool.query(
      `SELECT c.*, p.Nome AS nome_profissional
       FROM public.Consulta c
       JOIN public.ProfissionalSaude p ON c.IdProfissional = p.IdProfissional
       WHERE c.NumeroUtenteSaude = $1`,
      [numeroUtente]
    );
    res.json(consultas.rows);
  } catch (err) {
    console.error('Erro ao buscar consultas:', err.message);
    res.status(500).send('Erro ao buscar consultas');
  }
});



module.exports = router;