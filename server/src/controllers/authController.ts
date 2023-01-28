import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import {
  BadRequestError,
  CustomAPIError,
  UnAuthenticatedError,
} from '../errors/index.js';
import attachCookies from '../utils/attachCookies.js';
import { RequestHandler, Request, Response } from 'express';
import { IControllerRequest } from './definitions.js';

const register: RequestHandler = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name) {
    throw new BadRequestError('Please provide a name');
  }
  if (!email || !password) {
    throw new CustomAPIError('Email and password are required');
  }

  const userAlreadyExists = await User.findOne({ email });

  if (userAlreadyExists) {
    throw new BadRequestError('Email already in use');
  }

  const newUser = await User.create({ name, email, password });
  const token = newUser.createJWT();
  attachCookies({ res, token });
  const user = { name: newUser.name, email: newUser.email };
  res.status(StatusCodes.CREATED).json({ user });
};

const login: RequestHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Email and password are required');
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new UnAuthenticatedError('Invalid credentials');
  }

  const isPaswordCorrect = await user.comparePasswords(password);
  if (!isPaswordCorrect) {
    throw new UnAuthenticatedError('Invalid credentials');
  }

  const token = user.createJWT();
  attachCookies({ res, token });
  const userData = { name: user.name, email: user.email };
  res.status(StatusCodes.OK).json({ user: userData });
};

const updateUser: RequestHandler = async (req: Request, res: Response) => {
  const { name, email, newEmail } = req.body;

  if (!name) {
    throw new BadRequestError('Please provide a name');
  }

  if (!email) {
    throw new BadRequestError('Please provide an email');
  }

  if (!newEmail) {
    throw new BadRequestError('Please provide an email');
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnAuthenticatedError('User not found');
  }

  user.name = name;
  user.email = newEmail;
  await user.save();

  const userData = { name: user.name, email: user.email };

  const token = user.createJWT();
  attachCookies({ res, token });
  res.status(StatusCodes.OK).json({ user: userData });
};

const getCurrentUser: RequestHandler = async (req: IControllerRequest, res: Response) => {
  const { id } = req.user;

  if (!id) {
    throw new UnAuthenticatedError('User id not found');
  }

  const user = await User.findById(id);

  if (!user) {
    throw new UnAuthenticatedError('User not found');
  }

  const userData = { name: user.name, email: user.email };
  res.status(StatusCodes.OK).json({ user: userData });
};

const logout: RequestHandler = async (_req, res: Response) => {
  res.clearCookie('token', { httpOnly: true });
  res.status(StatusCodes.OK).json({ message: 'Logged out' });
};

export { register, login, updateUser, getCurrentUser, logout };
