import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import { UserProp } from '../utils/typeDefinitions';

const UserSchema = new mongoose.Schema<UserProp>({
  name: {
    type: String,
    required: [true, 'Please enter an name.'],
    minLength: 6,
    match: [
      /^[a-zA-Z\s]+$/,
      'Please enter a valid name (Alphabets, Space only & minimum length 6).',
    ],
  },
  email: {
    type: String,
    required: [true, 'Please enter an email.'],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please enter a valid email address.',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please enter a password.'],
    minLength: 8,
    select: false,
  },
  loggedIn: {
    type: Boolean,
    required: true,
    default: true,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

UserSchema.pre<UserProp>('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

UserSchema.methods.matchPasswords = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.getSignedToken = function () {
  if (process.env.JWT_SECRET) {
    return jwt.sign(
      { id: this._id, loggedIn: this.loggedIn },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRY,
      }
    );
  }
  throw new Error('JWT SECRET NOT FOUND!');
};

UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(30).toString('hex');

  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model<UserProp>('User', UserSchema);

export default User;
