import connection from '../db/connection.js'; 

export async function createUser(req, res) { 
    const { nome, email } = req.body;

    if (!nome || !email) {
        return res.status(400).json({ error: 'Nome e email são obrigatórios.' });
    }
    const dataCadastro = new Date().toISOString().split('T')[0];

    try {
        const [results] = await connection.execute(
            'INSERT INTO usuarios (nome, email, data_cadastro) VALUES (?, ?, ?)',
            [nome, email, dataCadastro]
        );

        res.status(201).json({ 
            id: results.insertId,
            nome,
            email,
            dataCadastro 
        });
    } catch (error) {
        console.error('Error ao inserir usuário:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}

export async function listUsers(req, res) { 
    try {
        const [rows] = await connection.execute('SELECT * FROM usuarios');
        res.json(rows);
    } catch (error) {
        console.error('Error ao buscar usuários:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}

export async function updateUser(req, res) { 
    const { id } = req.params;
    const { nome, email } = req.body;

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
        }

        res.json({ id, nome, email });
    } catch (error) {
        console.error('Error ao atualizar usuário:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}

export async function deleteUser(req, res) { 
    const { id } = req.params;

    try { 
        const [result] = await connection.execute(
            'DELETE FROM usuarios WHERE id = ?',
            [id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        res.status(204).send();
    } catch (error) {
        console.error('Error ao deletar usuário:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}
