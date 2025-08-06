import express from 'express';
import { getAllUsers, createUser, getUserById, updateUser, deleteUser } from '../controller/UserController.js';
import { get } from 'mongoose';

const route = express.Router();

route.get('/', getAllUsers);
route.post('/', createUser);
route.get('/:id', getUserById);
route.put('/:id', updateUser);
route.delete('/:id', deleteUser);


export default route;

