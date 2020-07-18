import { Router } from 'express';
import AuthMiddleware from './app/middlewares/authMiddleware'
import UserController from './controllers/UserController'
import AuthController from './controllers/AuthController'

import './database/connection'
const router = Router();

router.post('/user', UserController.store);
router.get('/user', UserController.index);
router.post('/auth',AuthController.store)

router.use(AuthMiddleware);


export default router;