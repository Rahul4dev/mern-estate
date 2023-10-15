import express from 'express';
import {
  test as userController,
  updateUserInfo as updateController,
} from '../controllers/user.controllers.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', userController);
router.post('/update/:id', verifyToken, updateController);

export default router;
