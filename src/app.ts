import express from 'express';
import { MikroORM } from '@mikro-orm/core';
import 'reflect-metadata';
import mikroConfig from './mikro-orm.config.js';
import { userRouter } from './routes/user.routes.js';
import cors from 'cors';

export const createApp = async () => {
  const app = express();
  app.use(express.json());
  app.use(cors({
    origin: 'http://localhost:5173', // tu frontend
    credentials: true,               // si vas a usar cookies / auth
  }));

  const orm = await MikroORM.init(mikroConfig);
  app.set('orm', orm);

  app.use('/users', userRouter);

  app.listen(3000, () => console.log('Servidor corriendo en puerto 3000'));
  return app;
};