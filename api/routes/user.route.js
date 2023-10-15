import express from 'express';
import {
  test as userController,
  updateUserInfo as updateController,
  deleteUser as deleteController,
} from '../controllers/user.controllers.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', userController);
router.post('/update/:id', verifyToken, updateController);
router.delete('/delete/:id', verifyToken, deleteController);

export default router;
