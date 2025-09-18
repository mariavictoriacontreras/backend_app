import express from 'express';
import { MikroORM } from '@mikro-orm/core';
import 'reflect-metadata';
import cors from 'cors';
import mikroConfig from './mikro-orm.config.js';
import { userRouter } from './routes/user.routes.js';
import { register, login } from './controllers/auth.controller.js';
import { authMiddleware } from './middleware/auth.middleware.js';

export const createApp = async () => {
  const app = express();
  app.use(express.json());
  app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }));

  try {
    console.log('Iniciando MikroORM...');
    const orm = await MikroORM.init(mikroConfig);
    console.log('MikroORM iniciado correctamente.');
    app.set('orm', orm);
  } catch (err) {
    console.error('Error iniciando MikroORM:', err && (err.stack ?? err));
    throw err; // relanzar para que index.ts lo capture y muestre stack
  }

  // Rutas y controllers
  app.use('/users', userRouter);
  app.post('/api/register', register);
  app.post('/api/login', login);
  app.get('/api/me', authMiddleware, (req, res) => {
    return res.json({ user: (req as any).user });
  });

  const PORT = process.env.PORT ?? 3000;
  app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
  return app;
};
