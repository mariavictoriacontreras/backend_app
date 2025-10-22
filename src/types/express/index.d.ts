import { User } from '../../entities/user.js';

declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}

export {};
