import { defineConfig } from '@mikro-orm/mysql';
import { ENV } from './config/env'; //tenes que crear la carpeta config y poner tu env

export default defineConfig({
  dbName: ENV.DB_NAME,
  user: ENV.DB_USER,
  password: ENV.DB_PASSWORD,
  host: ENV.DB_HOST,
  port: ENV.DB_PORT,
  debug: ENV.NODE_ENV === 'development',
});
