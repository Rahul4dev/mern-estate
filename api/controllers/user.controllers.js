import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';

export const test = (req, res) => {
  res.json({
    message: 'User API route is working!',
  });
};

export const updateUserInfo = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, 'You can only update your user info'));

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...restData } = updatedUser._doc;

    res.status(200).json(restData);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, 'You can only delete your account!'));

  try {
    await User.findByIdAndDelete(req.body.password);
    res.clearCookie('access_token');
    res.status(200).json({ message: 'User has been deleted' });
  } catch (error) {
    next(error);
  }
};
