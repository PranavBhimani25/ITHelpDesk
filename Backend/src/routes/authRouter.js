import exprass from 'express';
import { getMe, loginUser, logoutUser, registerUser } from '../controller/authController.js';
import protect from '../middleware/authmiddleware.js';
const route = exprass.Router();

route.post('/register', registerUser);
route.post('/login', loginUser);
route.get('/me',protect, getMe);
route.post('/logout', logoutUser);

export default route;