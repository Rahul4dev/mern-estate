import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 12);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();

    res.status(200).json({ message: 'User saved successfully' });
  } catch (error) {
    next(error);
  }
};
