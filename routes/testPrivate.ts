import express from 'express';
import getTestPrivateRoute from '../controllers/testPrivate';
import protection from '../middleware/auth';

export const router = express.Router();

router.get('/', getTestPrivateRoute);
