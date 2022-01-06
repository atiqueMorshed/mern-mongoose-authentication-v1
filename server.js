import express from 'express';
import dotenv from 'dotenv';

import { router } from './routes/auth.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api/auth', router);

const PORT = process.env.port || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
