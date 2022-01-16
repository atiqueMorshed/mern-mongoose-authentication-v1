import crypto from 'crypto';

import { Request, Response, NextFunction } from 'express';
import { UserInfoRequest } from '../utils/typeDefinitions';

import User from '../models/User';
import { sendResponse, sendToken } from '../utils/sendResponse';
import { UserProp } from '../utils/typeDefinitions';
import sendEmail from '../utils/sendEmail';

export const registerController = async (
  req: UserInfoRequest,
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
  req: UserInfoRequest,
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

export const forgotPasswordController = async (
  req: UserInfoRequest,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  if (!email) return sendResponse(res, 406, undefined, 'E-100006');

  const user = await User.findOne({ email });
  if (!user) return sendResponse(res, 404, 'Invalid Email.', 'E-100007');

  const resetToken = user.getResetPasswordToken();

  if (!resetToken) return sendResponse(res, 404, 'Invalid Token', 'E-100011');

  await user.save();

  let resetUrl;
  // SET FRONTEND URL IN DOTENV
  if (process.env.FRONTEND)
    resetUrl = `${process.env.FRONTEND}resetpassword/${resetToken}`;
  else throw new Error('Front end url not set in dotenv');

  const message = `
      <h1>You or someone else have requested a password reset token.</h1>
      <br>
      <p>Please use this link to reset your password. The link expires in 10 minutes.</p>
      <br>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
      <br>
      <p>If you did not request a password reset you can safely ignore this email.</p>
    `;

  try {
    sendEmail({
      to: user.email,
      subject: 'Password Reset E-mail',
      message: message,
    });

    return sendResponse(res, 200, 'Reset Email Sent.', 'E-100013');
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return sendResponse(res, 500, 'Reset email could not be sent.', 'E-100012');
  }
};

export const resetPasswordController = async (
  req: UserInfoRequest,
  res: Response,
  next: NextFunction
) => {
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resetToken)
    .digest('hex');

  if (!resetPasswordToken) return sendResponse(res, 404, undefined, 'E-100011');

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user)
      return sendResponse(
        res,
        400,
        'Invalid or outdated Reset Password Token',
        'E-100014'
      );

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return sendResponse(res, 201, 'Password Reset Successful', 'S-900000');
  } catch (error) {
    return sendResponse(res, 500, error, 'E-100015');
  }
};
