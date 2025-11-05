import { Request, Response } from 'express';
import { MikroORM } from '@mikro-orm/core';
import { Role } from '../entities/role.js';

export async function getRoles(req: Request, res: Response) {
  const orm = req.app.get('orm') as MikroORM;
  const em = orm.em.fork();

  try {
    const roles = await em.find(Role, {});
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener roles' });
  }
}

export async function getRoleById(req: Request, res: Response) {
  const orm = req.app.get('orm') as MikroORM;
  const em = orm.em.fork();

  const id = Number(req.params.id);

  try {
    const role = await em.findOne(Role, { idRol: id });
    if (!role) return res.status(404).json({ error: 'Rol no encontrado' });

    res.json(role);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar el rol' });
  }
}

export async function createRole(req: Request, res: Response) {
  const orm = req.app.get('orm') as MikroORM;
  const em = orm.em.fork();

  try {
    const { nombre } = req.body;
    const existing = await em.findOne(Role, { nombre });
    if (existing) return res.status(400).json({ error: 'El rol ya existe' });

    const newRole = new Role();
    newRole.nombre = nombre;

    await em.persistAndFlush(newRole);

    res.status(201).json(newRole);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el rol' });
  }
}

export async function updateRole(req: Request, res: Response) {
  const orm = req.app.get('orm') as MikroORM;
  const em = orm.em.fork();

  const id = Number(req.params.id);

  try {
    const role = await em.findOne(Role, { idRol: id });
    if (!role) return res.status(404).json({ error: 'Rol no encontrado' });

    const { nombre } = req.body;
    role.nombre = nombre ?? role.nombre;

    await em.persistAndFlush(role);

    res.json(role);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar rol' });
  }
}

export async function deleteRole(req: Request, res: Response) {
  const orm = req.app.get('orm') as MikroORM;
  const em = orm.em.fork();

  const id = Number(req.params.id);

  try {
    const role = await em.findOne(Role, { idRol: id });
    if (!role) return res.status(404).json({ error: 'Rol no encontrado' });

    await em.removeAndFlush(role);
    res.json({ message: 'Rol eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar rol' });
  }
}
