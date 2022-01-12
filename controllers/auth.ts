import { Request, Response, NextFunction } from 'express';

import User from '../models/User';
import { sendResponse, sendToken } from '../utils/sendResponse';
import { UserProp } from '../utils/typeDefinitions';

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
    // DONE: SEND JWT TOKEN
    sendToken(user, 201, res);
  } catch (error: any) {
    return sendResponse(res, 406, undefined, 'E-100008');
  }
};
// mern-mongoose-auth /controllers/auth
export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return sendResponse(res, 406, undefined, 'E-100006');
  }

  try {
    const user = await User.findOne({ email }).select('+password');

    if (!user)
      return sendResponse(res, 404, 'Invalid Credentials.', 'E-100007');

    const isMatch = await user.matchPasswords(password);

    if (!isMatch)
      return sendResponse(res, 404, 'Invalid Credentials.', 'E-100007');

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { loggedIn: true },
      { updated: true }
    );
    if (!updatedUser)
      return sendResponse(res, 404, 'Invalid Credentials.', 'E-100008');

    // DONE: SEND JWT TOKEN
    sendToken(updatedUser, 200, res);
  } catch (error: any) {
    return sendResponse(res, 500, undefined, 'E-100009');
  }
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
