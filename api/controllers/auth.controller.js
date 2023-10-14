import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import Jwt from 'jsonwebtoken';

import { errorHandler } from '../utils/error.js';

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

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(
        errorHandler(401, 'Wrong Credentials! Please check before trying again')
      );
    }
    const token = Jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY);
    const { password: pass, ...restData } = validUser._doc;
    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(restData);
  } catch (error) {
    next(error);
  }
};

export const googleAuth = async (req, res, next) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      const token = Jwt.sign(
        { id: userExists._id },
        process.env.JWT_SECRET_KEY
      );
      const { password: pass, ...restData } = userExists._doc;

      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(restData);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photoUrl,
      });

      await newUser.save();
      const token = Jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY);
      const { password: pass, ...restData } = newUser._doc;
      console.log(restData);
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(restData);
    }
  } catch (error) {
    next(error);
  }
};
