// src/types/express/index.d.ts
import { User } from '../../entities/user.js';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
