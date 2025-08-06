import express from 'express';
import { MikroORM } from '@mikro-orm/core';
import 'reflect-metadata';
import mikroConfig from './mikro-orm.config';

export const createApp = async () => {
  const app = express();
  app.use(express.json());

  const orm = await MikroORM.init(mikroConfig);
  app.set('orm', orm);


  app.listen(3000, () => console.log('Servidor corriendo en puerto 3000'));
  return app;
};