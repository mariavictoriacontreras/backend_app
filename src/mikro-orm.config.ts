import { defineConfig } from '@mikro-orm/mysql';
import { ENV } from './config/env';
import { User } from './entities/user';

export default defineConfig({
  entities: [User],
  dbName: ENV.DB_NAME,
  user: ENV.DB_USER,
  password: ENV.DB_PASSWORD,
  host: ENV.DB_HOST,
  port: ENV.DB_PORT,
  debug: ENV.NODE_ENV === 'development',
});
