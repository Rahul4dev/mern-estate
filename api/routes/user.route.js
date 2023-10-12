import express from 'express';
import { test as userController } from '../controllers/user.controllers.js';

const router = express.Router();

router.get('/test', userController);

export default router;
