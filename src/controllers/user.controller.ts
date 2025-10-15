import { Request, Response } from 'express';
import { MikroORM } from '@mikro-orm/core';
import { User } from '../entities/user.js';
import { Role } from '../entities/role.js';

export async function getUsers(req: Request, res: Response) {
  const orm = req.app.get('orm') as MikroORM;
  const em = orm.em.fork();

  try {
    const users = await em.find(User, {}, { populate: ['rol'] });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
}

export async function getUserById(req: Request, res: Response) {
  const orm = req.app.get('orm') as MikroORM;
  const em = orm.em.fork();

  const id = Number(req.params.id);

  try {
    const user = await em.findOne(User, { idUsuario: id }, { populate: ['rol'] });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar el usuario' });
  }
}

export async function createUser(req: Request, res: Response) {
  const orm = req.app.get('orm') as MikroORM;
  const em = orm.em.fork();

  try {
    const { nombreApellido, email, direccion, telefono, rolId, password } = req.body;

    // Buscar rol
    const role = await em.findOne(Role, { idRol: rolId });
    if (!role) return res.status(400).json({ error: 'Rol no válido' });

    const newUser = new User();
    newUser.nombreApellido = nombreApellido;
    newUser.email = email;
    newUser.direccion = direccion;
    newUser.telefono = telefono;
    newUser.password = password;
    newUser.rol = role;

    await em.persistAndFlush(newUser);

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
}

export async function updateUser(req: Request, res: Response) {
  const orm = req.app.get('orm') as MikroORM;
  const em = orm.em.fork();

  const id = Number(req.params.id);

  try {
    const user = await em.findOne(User, { idUsuario: id });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const { nombreApellido, email, direccion, telefono, rolId } = req.body;

    if (rolId) {
      const role = await em.findOne(Role, { idRol: rolId });
      if (!role) return res.status(400).json({ error: 'Rol no válido' });
      user.rol = role;
    }

    user.nombreApellido = nombreApellido ?? user.nombreApellido;
    user.email = email ?? user.email;
    user.direccion = direccion ?? user.direccion;
    user.telefono = telefono ?? user.telefono;

    await em.persistAndFlush(user);

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
}

export async function deleteUser(req: Request, res: Response) {
  const orm = req.app.get('orm') as MikroORM;
  const em = orm.em.fork();

  const id = Number(req.params.id);

  try {
    const user = await em.findOne(User, { idUsuario: id });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    await em.removeAndFlush(user);
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
}
