import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { DI } from '../di.js';
import { User } from '../entities/user.js';
import { Role } from '../entities/role.js';

const JWT_SECRET = process.env.JWT_SECRET || 'clave_secreta';

export const register = async (req: Request, res: Response) => {
  try {
    const { nombreApellido, email, direccion, telefono, tipoDocumento, nroDocumento, password, rolId } = req.body;
    const em = DI.orm.em.fork();
    const userRepository = em.getRepository(User);

    const existingUser = await userRepository.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let role: Role | null = null;
    if (rolId) {
      role = await em.findOne(Role, { idRol: rolId });
      if (!role) return res.status(400).json({ message: 'Rol no válido' });
    } else {
      role = await em.findOne(Role, { nombre: 'user' });
      if (!role) {
        role = em.create(Role, { nombre: 'user' });
        await em.persistAndFlush(role);
      }
    }

    const user = em.create(User, {
      nombreApellido,
      email,
      direccion,
      telefono,
      tipoDocumento,
      nroDocumento,
      password: hashedPassword,
      rol: role,
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
    const em = DI.orm.em.fork();
    const userRepository = em.getRepository(User);

    const user = await userRepository.findOne({ email }, { populate: ['rol'] });
    if (!user) return res.status(400).json({ message: 'Usuario no encontrado' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign(
      { userId: user.idUsuario, email: user.email, rol: user.rol.nombre },
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
        rol: user.rol.nombre,
      },
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
