import express from 'express';
import cors from 'cors';
import 'reflect-metadata';
import { DI, initORM } from './di.js';import { authRouter } from './routes/auth.routes.js';
import { userRouter } from './routes/user.routes.js';
import { roleRouter } from './routes/role.routes.js';
import { register, login } from './controllers/auth.controller.js';
import { authMiddleware } from './middleware/auth.middleware.js';
import { linkPagoRoutes } from './routes/link-pago.routes.js';
import { donationRoutes } from './routes/donation.routes.js';

export const createApp = async () => {
  const app = express();

  app.use(express.json());
  app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }));

  try {
    console.log('Iniciando MikroORM...');
    await initORM();
    app.set('orm', DI.orm);
    console.log('MikroORM iniciado correctamente.');
  } catch (err) {
    console.error('Error iniciando MikroORM:', err);
    throw err;
  }

  app.use('/auth', authRouter);
  app.use('/users', userRouter);
  app.use('/roles', roleRouter);
  app.use('/link-pago', linkPagoRoutes);
  app.use('/donaciones', donationRoutes);
  app.post('/api/register', register);
  app.post('/api/login', login);
  app.get('/api/me', authMiddleware, (req, res) => {
    return res.json({ user: (req as any).user });
  });

  const PORT = process.env.PORT ?? 4000;
  app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

  return app;
};
