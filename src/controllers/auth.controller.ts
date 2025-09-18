import { Request, Response } from 'express';
import { hashPassword, comparePassword } from '../utils/hash';
import { signToken } from '../utils/jwt';
import { User } from '../entities/user';
// import { DI } from '../di'; // ejemplo: cómo obtener la ORM — adaptá según tu index

// Si no usás DI, importá la instancia de ORM que crees en index.ts

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'email y password requeridos' });

    const em = DI.em; // o obtenelo de donde tengas
    const exists = await em.findOne(User, { email });
    if (exists) return res.status(409).json({ message: 'email ya registrado' });

    const hashed = await hashPassword(password);
    const user = new User();
    user.email = email;
    user.password = hashed;
    user.name = name;

    await em.persistAndFlush(user);

    // opcional: generar token inmediatamente
    const token = signToken({ userId: user.id, email: user.email });

    // ejemplo: enviar token en body (o cookie)
    return res.status(201).json({ user: { id: user.id, email: user.email, name: user.name }, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'error interno' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'email y password requeridos' });

    const em = DI.em;
    const user = await em.findOne(User, { email });
    if (!user) return res.status(401).json({ message: 'credenciales inválidas' });

    const ok = await comparePassword(password, user.password);
    if (!ok) return res.status(401).json({ message: 'credenciales inválidas' });

    const token = signToken({ userId: user.id, email: user.email });

    // opción A: enviar en body
    // return res.json({ token });

    // opción B (recomendada): enviar cookie httpOnly
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      // secure: true, // activar en prod con HTTPS
      maxAge: 1000 * 60 * 60, // ejemplo 1h
    });

    return res.json({ message: 'autenticado', user: { id: user.id, email: user.email } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'error interno' });
  }
};
