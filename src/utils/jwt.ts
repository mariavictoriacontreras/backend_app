import jwt, { SignOptions, Secret } from 'jsonwebtoken';

const JWT_SECRET: Secret = process.env.JWT_SECRET || 'clave_secreta';
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN ?? '1h') as string;

export type JWTPayload = {
  userId: number;
  email?: string;
  rol?: string;
};

export const signToken = (payload: JWTPayload): string => {
  const options: SignOptions = { expiresIn: JWT_EXPIRES_IN as any }; 
  return jwt.sign(payload, JWT_SECRET, options);
};

export const verifyToken = (token: string): JWTPayload => {
  return jwt.verify(token, JWT_SECRET) as JWTPayload;
};
