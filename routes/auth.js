import express from 'express';

import {
  registerController,
  loginController,
  forgotPasswordController,
  resetPasswordController,
} from '../controllers/auth.js';

export const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/forgot', forgotPasswordController);
router.put('/reset/:resetToken', resetPasswordController);
