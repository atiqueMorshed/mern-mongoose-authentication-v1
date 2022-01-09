import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({
      name,
      email,
      password,
    });

    res.send({
      success: true,
      user,
    });
  } catch (error: any) {
    res.send({
      success: false,
      error: error.message,
    });
  }
};

export const loginController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.send('Login Route.');
};

export const forgotPasswordController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.send('Forgot Password Route.');
};

export const resetPasswordController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.send('Reset Password Route.');
};
