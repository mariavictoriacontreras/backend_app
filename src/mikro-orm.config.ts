import { defineConfig } from '@mikro-orm/mysql';
import { ENV } from './config/env.js';
import { User } from './entities/user.js';
import { Pet } from './entities/pet.js';
import { Role } from './entities/role.js';
import { Specie } from './entities/specie.js';
export default defineConfig({
  dbName: ENV.DB_NAME,
  user: ENV.DB_USER,
  password: ENV.DB_PASSWORD,
  host: ENV.DB_HOST,
  port: ENV.DB_PORT,
  debug: ENV.NODE_ENV === 'development',
   entities: [User, Pet, Role, Specie],
});
