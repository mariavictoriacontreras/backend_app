import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.js';
import { DI } from '../di.js';
import { User } from '../entities/user.js';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Buscamos token en encabezado o cookie
    const header = req.headers.authorization;
    const token =
      header?.startsWith('Bearer ')
        ? header.split(' ')[1]
        : (req.cookies?.token ?? null);

    if (!token) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }

    // Verificamos el token
    const decoded = verifyToken(token);
    if (!decoded || !decoded.userId) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    // Buscamos al usuario en la base de datos
    const user = await DI.em.findOne(User, { idUsuario: decoded.userId }, { populate: ['rol', 'linkPago'] });
    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    // Guardamos la entidad completa en req.user
    req.user = user;

    next();
  } catch (err) {
    console.error('Error en authMiddleware:', err);
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};
