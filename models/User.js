import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter an name.'],
    minLength: 6,
    match: [
      /^[a-zA-Z\s]+$/,
      'Please enter a valid name (Alphabets only & minimum length 6).',
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

const User = mongoose.Model('User', UserSchema);

export default User;
