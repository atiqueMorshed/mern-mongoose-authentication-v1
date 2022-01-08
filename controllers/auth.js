import User from '../models/User.js';

export const registerController = async (req, res, next) => {
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
  } catch (error) {
    res.send({
      success: false,
      error: error.message,
    });
  }
};

export const loginController = (req, res, next) => {
  res.send('Login Route.');
};

export const forgotPasswordController = (req, res, next) => {
  res.send('Forgot Password Route.');
};

export const resetPasswordController = (req, res, next) => {
  res.send('Reset Password Route.');
};
