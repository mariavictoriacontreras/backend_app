import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { DI } from '../di.js';
import { User } from '../entities/user.js';

const JWT_SECRET = process.env.JWT_SECRET || 'clave_secreta';

export const register = async (req: Request, res: Response) => {
  try {
    const { nombreApellido, email, direccion, telefono, rol, password } = req.body;

    // Creo un nuevo EntityManager para esta request
    const em = DI.orm.em.fork();
    const userRepository = em.getRepository(User);

    // Vemos si ya existe el usuario
    const existingUser = await userRepository.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Encripto la pass
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creo y guardo el nuevo usuario
    const user = em.create(User, {
      nombreApellido,
      email,
      direccion,
      telefono,
      rol: rol || 'user',
      password: hashedPassword,
    });

    await em.persistAndFlush(user);

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error('Error en register:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Creamos un nuevo EntityManager para esta request
    const em = DI.orm.em.fork();
    const userRepository = em.getRepository(User);

    // busca usuario por email
    const user = await userRepository.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    // Chequeamos contraseña
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Creamos token 
    const token = jwt.sign(
      { userId: user.idUsuario, email: user.email, rol: user.rol },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login exitoso',
      token,
      usuario: {
        id: user.idUsuario,
        nombreApellido: user.nombreApellido,
        email: user.email,
        rol: user.rol,
      },
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
