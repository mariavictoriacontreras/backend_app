import { Request, Response } from 'express'
import { MikroORM } from '@mikro-orm/core'
import { Pet } from '../entities/pet.js'

// Obtener todas las mascotas
export async function getPets(req: Request, res: Response) {
  const orm = req.app.get('orm') as MikroORM
  const em = orm.em.fork()

  try {
    const pets = await em.find(Pet, {})
    res.json(pets)
  } catch (error: any) {
    res.status(500).json({ error: 'Error al obtener mascotas' })
  }
}

// Obtener una mascota por ID
export async function getPetById(req: Request, res: Response) {
  const orm = req.app.get('orm') as MikroORM
  const em = orm.em.fork()

  const id = Number(req.params.id)

  try {
  const pet = await em.findOne(Pet, { idPet: id });
  if (!pet) {
    res.status(404).json({ error: 'Mascota no encontrada' });
    return;
  }
  res.json(pet);
} catch (error: any) {
  console.error('Error real:', error);  // <-- imprime el error completo
  res.status(500).json({ error: error.message });
}
}

// Crear una nueva especie
export async function createPet(req: Request, res: Response) {
  const orm = req.app.get('orm') as MikroORM
  const em = orm.em.fork()

  try {
    const { name, birthday, description, user, specie } = req.body

    const newPet = new Pet()
    newPet.name = name
    newPet.birthday = birthday
    newPet.description = description
    newPet.user = user
    newPet.specie = specie
    await em.persistAndFlush(newPet)

    res.status(201).json(newPet)
  } catch (error: any) {
    res.status(500).json({ error: 'Error al crear la mascota' })
  }
}

// Actualizar una especie existente
export async function updatePet(req: Request, res: Response) {
  const orm = req.app.get('orm') as MikroORM
  const em = orm.em.fork()

  const id = Number(req.params.id)

  try {
    const pet = await em.findOne(Pet, { idPet: id })
    if (!pet) {
      res.status(404).json({ error: 'Mascota no encontrada' })
      return
    }

    const { name, birthday, description, user, specie } = req.body
    pet.name = name ?? pet.name
    pet.birthday = birthday ?? pet.birthday
    pet.description = description ?? pet.description
    pet.user = user ?? pet.user
    pet.specie = specie ?? pet.specie

    await em.persistAndFlush(pet)

    res.json(pet)
  } catch (error: any) {
    res.status(500).json({ error: 'Error al actualizar la mascota' })
  }
}

// Eliminar una especie
export async function deletePet(req: Request, res: Response) {
  const orm = req.app.get('orm') as MikroORM
  const em = orm.em.fork()

  const id = Number(req.params.id)

  try {
    const pet = await em.findOne(Pet, { idPet: id })
    if (!pet) {
      res.status(404).json({ error: 'Mascota no encontrada' })
      return
    }

    await em.removeAndFlush(pet)

    res.json({ message: 'Mascota eliminada correctamente' })
  } catch (error: any) {
    res.status(500).json({ error: 'Error al eliminar la mascota' })
  }
}
