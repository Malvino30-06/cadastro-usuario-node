import express from 'express';
import {
    createUser,
    listUsers,
    updateUser,
    deleteUser
} from '../controllers/userController.js';

const router = express.Router();

router.post('/', createUser);
router.get('/', listUsers);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router; // exportando o router para ser usado em outros arquivos