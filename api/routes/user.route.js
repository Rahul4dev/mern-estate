import express from 'express';
import {
  test as userController,
  updateUserInfo as updateController,
  deleteUser as deleteController,
  getUserListings as userListingController,
  getUser as getUserController,
} from '../controllers/user.controllers.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', userController);
router.post('/update/:id', verifyToken, updateController);
router.delete('/delete/:id', verifyToken, deleteController);
router.get('/listings/:id', verifyToken, userListingController);
router.get('/:id', verifyToken, getUserController);

export default router;
