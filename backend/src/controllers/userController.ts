import { Request, Response } from 'express';
import User from '../models/User';
import { IUser } from '../types/user.types';

// @desc    Create new user
// @route   POST /api/users
// @access  Public
export const createUser = async (req: Request<object, object, IUser>, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, phone, email, address } = req.body;

    // Check if user with email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: 'User with this email already exists' });
      return;
    }

    const user = await User.create({
      firstName,
      lastName,
      phone,
      email,
      address
    });

    res.status(201).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : 'Error creating user'
    });
  }
};

// @desc    Get all users
// @route   GET /api/users
// @access  Public
export const getUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Error fetching users'
    });
  }
};
