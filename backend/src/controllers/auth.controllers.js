import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';

const register = asyncHandler(async (req, res) => {
  const { name, username, password, passoutYear } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    name,
    username,
    password: hashedPassword,
    passoutYear
  });
  await newUser.save();
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
  res.status(201).json(new ApiResponse('Registration successful', { token }));
});

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new ApiError('Invalid username or password', 401);
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
  res.status(200).json(new ApiResponse('Login successful', { token }));
});

export { register, login };
