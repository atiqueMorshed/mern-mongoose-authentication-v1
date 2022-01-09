import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

interface UserProp extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  resetPasswordToken: string;
  resetPasswordExpire: Date;
}

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

const User = mongoose.model<UserProp>('User', UserSchema);

export default User;
