import { Request, Response } from 'express'
import { MikroORM } from '@mikro-orm/core'
import { User } from '../entities/user'

export async function getUsers(req: Request, res: Response) {
  const orm = req.app.get('orm') as MikroORM
  const em = orm.em.fork()

  try {
    const users = await em.find(User, {})
    res.json(users)
  } catch (error: any) {
    res.status(500).json({ error: 'Error al obtener usuarios' })
  }
}

export async function getUserById(req: Request, res: Response) {
  const orm = req.app.get('orm') as MikroORM
  const em = orm.em.fork()

  const id = Number(req.params.id)

  try {
    const user = await em.findOne(User, { idUsuario: id })
    if (!user) {
      res.status(404).json({ error: 'Usuario no encontrado' })
      return
    }
    res.json(user)
  } catch (error: any) {
    res.status(500).json({ error: 'Error al buscar el usuario' })
  }
}

export async function createUser(req: Request, res: Response) {
  const orm = req.app.get('orm') as MikroORM
  const em = orm.em.fork()

  try {
    const { nombreApellido, email, direccion, telefono, rol } = req.body

    const newUser = new User()
    newUser.nombreApellido = nombreApellido
    newUser.email = email
    newUser.direccion = direccion
    newUser.telefono = telefono
    newUser.rol = rol

    await em.persistAndFlush(newUser)

    res.status(201).json(newUser)
  } catch (error: any) {
    res.status(500).json({ error: 'Error al crear el usuario' })
  }
}

export async function updateUser(req: Request, res: Response) {
  const orm = req.app.get('orm') as MikroORM
  const em = orm.em.fork()

  const id = Number(req.params.id)

  try {
    const user = await em.findOne(User, { idUsuario: id })
    if (!user) {
      res.status(404).json({ error: 'Usuario no encontrado' })
      return
    }

    const { nombreApellido, email, direccion, telefono, rol } = req.body

    user.nombreApellido = nombreApellido ?? user.nombreApellido
    user.email = email ?? user.email
    user.direccion = direccion ?? user.direccion
    user.telefono = telefono ?? user.telefono
    user.rol = rol ?? user.rol

    await em.persistAndFlush(user)

    res.json(user)
  } catch (error: any) {
    res.status(500).json({ error: 'Error al actualizar usuario' })
  }
}

export async function deleteUser(req: Request, res: Response) {
  const orm = req.app.get('orm') as MikroORM
  const em = orm.em.fork()

  const id = Number(req.params.id)

  try {
    const user = await em.findOne(User, { idUsuario: id })
    if (!user) {
      res.status(404).json({ error: 'Usuario no encontrado' })
      return
    }

    await em.removeAndFlush(user)

    res.json({ message: 'Usuario eliminado correctamente' })
  } catch (error: any) {
    res.status(500).json({ error: 'Error al eliminar usuario' })
  }
}
