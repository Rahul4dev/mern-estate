import express from 'express';

import { signUp as authController } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', authController);

export default router;
