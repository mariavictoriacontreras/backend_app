import { MikroORM } from '@mikro-orm/core';
import { User } from './entities/user.js';
import mikroConfig from './mikro-orm.config.js';

export const DI = {} as {
  orm: MikroORM;
  em: any;
  userRepository: any;
};

export const initORM = async () => {
  DI.orm = await MikroORM.init(mikroConfig);
  DI.em = DI.orm.em.fork();
  DI.userRepository = DI.orm.em.getRepository(User);
};