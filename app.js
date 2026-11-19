import express from 'express';
import cors from 'cors';
import { env } from './src/config/env.js';
import { connectDB } from './src/config/dbConfig.js';
import authRoutes from './src/routes/authRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import { errorHandler } from './src/middlewares/errorHandler.js';

const app = express();

app.use(cors({ origin: env.frontendUrl, credentials: true }));
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.use((_req, res) => res.status(404).json({ message: 'Ruta no encontrada' }));
app.use(errorHandler);

const start = async () => {
  await connectDB();
  app.listen(env.port, () => console.log(`✅ http://localhost:${env.port}`));
};

start();
