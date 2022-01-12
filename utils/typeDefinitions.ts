import { Request } from 'express';
import mongoose from 'mongoose';
import { JwtPayload } from 'jsonwebtoken';

export interface UserProp extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  loggedIn: boolean;
  resetPasswordToken: string;
  resetPasswordExpire: Date;
  matchPasswords: (password: string) => Promise<boolean>;
  getSignedToken: () => JwtPayload;
}

export interface UserInfoRequest extends Request {
  user: UserProp;
}
