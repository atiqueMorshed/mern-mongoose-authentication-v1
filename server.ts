import dotenv from 'dotenv';
dotenv.config();

import express from 'express';

import connectDB from './config/db';
import validateUserLayer from './middleware/auth';
import { router as authRouter } from './routes/auth';
import { router as testRouter } from './routes/testPrivate';

// Connect DB
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRouter);
app.use('/test', validateUserLayer, testRouter);

const PORT = process.env.port || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Unhandled Rejections (connectDB)
process.on('unhandledRejection', (error, promise) => {
  console.log(`Error Log: ${error}`);
  server.close(() => process.exit(1));
});
