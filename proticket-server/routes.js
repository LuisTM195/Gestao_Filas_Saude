const express = require('express');
const router = express.Router();
const pool = require('./db');

// Rota para adicionar uma nova senha
router.post('/senha', async (req, res) => {
    const { numeroSenha, numeroUtenteSaude, idFila } = req.body;
    try {
        const newSenha = await pool.query(
            'INSERT INTO Senha (NumeroSenha, NumeroUtenteSaude, IdFila, DataEmissao, HoraEmissao, Estado) VALUES ($1, $2, $3, CURRENT_DATE, CURRENT_TIME, $4) RETURNING *',
            [numeroSenha, numeroUtenteSaude, idFila, 'em espera']
        );
        res.json(newSenha.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Erro ao criar senha");
    }
});

// Rota para obter todas as senhas
router.get('/senhas', async (req, res) => {
    try {
        const allSenhas = await pool.query('SELECT * FROM Senha');
        res.json(allSenhas.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Erro ao obter senhas");
    }
});

// Rota para avançar uma senha
router.put('/senha/avancar/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM Senha WHERE IdSenha = $1', [id]);
        res.sendStatus(200);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Erro ao avançar senha");
    }
});

module.exports = router;