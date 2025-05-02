import mysql2 from 'mysql2/promise';
import { createServer } from 'http';
import { createConnection } from 'mysql2';
import path from 'path';
import express from 'express';

const app = express();
const PORT = 3000;
app.use(express.json());

const connection = await mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Dominiquemeuamor1+',
    database: 'projeto_t',
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.post('/api/usuarios', async (req, res) => {
    const { nome, email } = req.body;

    if (!nome || !email) {
        return res.status(400).json({ error: 'Nome e email são obrigatórios.' });
    }
    const dataCadastro = new Date().toISOString().split('T')[0];

    try {
    const [results] = await connection.execute(
    'INSERT INTO usuarios (nome, email, data_cadastro) VALUES (?, ?, ?)',
    [nome, email, dataCadastro]);

    res.status(201).json({ id: results.insertId,
    nome,
    email,
    dataCadastro });
    } catch (error) {
        console.error('Error ao inserir usuário:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});

app.get('/api/usuarios', async (req, res) => {
    try {
        const [rows] = await connection.execute('SELECT * FROM usuarios');
        res.json(rows);
    } catch (error) {
        console.error('Error ao buscar usuários:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});

app.put('/api/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    req.params.id = parseInt(req.params.id, 10);
    const { nome, email } = req.body;
    req.body.nome = nome, email;
    
    if (!nome && !email) {
        return res.status(400).json({ error: 'Nome ou email são obrigatórios.' });
    }
    try {
        const [result] = await connection.execute(
            'UPDATE usuarios SET nome = ?, email = ? WHERE id = ?',
            [nome, email, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        } else {
            console.log('Usuário atualizado com sucesso!');
        }
        
        res.json({ id, nome, email });
    } catch (error) {
        console.error('Error ao atualizar usuário:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});

app.delete('/api/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    req.params.id = parseInt(req.params.id, 10);

    try { 
        const [result] = await connection.execute(
            'DELETE FROM usuarios WHERE id = ?',
            [id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        } else {
            console.log('Usuário deletado com sucesso!');
        }
        res.status(204).send();
    } catch (error) {
        console.error('Error ao deletar usuário:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});