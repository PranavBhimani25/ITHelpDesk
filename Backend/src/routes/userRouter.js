import express from 'express';
import { getAllUsers, createUser, getUserById, updateUser, deleteUser } from '../controller/UserController.js';
import protect from '../middleware/authMiddleware.js';

const route = express.Router();

route.get('/', getAllUsers);
route.post('/', createUser);
route.get('/:id', getUserById);
route.put('/:id',protect, updateUser);
route.put('/:id/delete',protect, deleteUser);


export default route;

