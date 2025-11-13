import express from 'express';
import cors from 'cors';
import 'reflect-metadata';
import { DI, initORM } from './di.js';
import { authRouter } from './routes/auth.routes.js';
import { userRouter } from './routes/user.routes.js';
import { specieRouter } from './routes/specie.routes.js';
import { petRouter } from './routes/pet.routes.js';
import { roleRouter } from './routes/role.routes.js';
import { register, login } from './controllers/auth.controller.js';
import { authMiddleware } from './middleware/auth.middleware.js';
import { adoptionRouter } from './routes/adoption.routes.js';


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
    // Agrego ORM en Express
    app.set('orm', DI.orm);

    console.log('MikroORM iniciado correctamente.');
  } catch (err) {
    console.error('Error iniciando MikroORM:', err);
    throw err;
  }

  app.use('/uploads', express.static('uploads'));
  app.use('/auth', authRouter);
  app.use('/species', specieRouter);
  app.use('/users', userRouter);
  app.use('/pets', petRouter);
  app.use('/roles', roleRouter);
  app.post('/api/register', register);
  app.use('/adoptions', adoptionRouter);
  app.post('/api/login', login);
  app.get('/api/me', authMiddleware, (req, res) => {
    return res.json({ user: (req as any).user });
  });

  const PORT = process.env.PORT ?? 4000;
  app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

  return app;
};
