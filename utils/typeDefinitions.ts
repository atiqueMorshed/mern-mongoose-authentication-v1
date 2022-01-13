import { Request } from 'express';
import mongoose from 'mongoose';
import { JwtPayload } from 'jsonwebtoken';

export interface UserProp extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  loggedIn: boolean;
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
  matchPasswords: (password: string) => Promise<boolean>;
  getSignedToken: () => JwtPayload;
  getResetPasswordToken: () => string;
}

export interface UserInfoRequest extends Request {
  user?: UserProp;
}

export interface sendEmailOptions {
  to: string;
  subject: string;
  message: string;
}
