import { defineConfig } from '@mikro-orm/mysql';
import { User } from './dist/entities/user.js';
import { Role } from './dist/entities/role.js';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  dbName: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  debug: process.env.NODE_ENV === 'development',
  entities: [User, Role],
  migrations: {
    path: './dist/migrations', 
    pathTs: './src/migrations', 
  },
});
