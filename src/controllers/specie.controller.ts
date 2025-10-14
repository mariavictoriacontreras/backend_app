import { Request, Response } from 'express'
import { MikroORM } from '@mikro-orm/core'
import { Specie } from '../entities/specie.js'

// Obtener todas las especies
export async function getSpecies(req: Request, res: Response) {
  const orm = req.app.get('orm') as MikroORM
  const em = orm.em.fork()

  try {
    const species = await em.find(Specie, {})
    res.json(species)
  } catch (error: any) {
    res.status(500).json({ error: 'Error al obtener especies' })
  }
}

// Obtener una especie por ID
export async function getSpecieById(req: Request, res: Response) {
  const orm = req.app.get('orm') as MikroORM
  const em = orm.em.fork()

  const id = Number(req.params.id)

  try {
    const specie = await em.findOne(Specie, { idSpecie: id })
    if (!specie) {
      res.status(404).json({ error: 'Especie no encontrada' })
      return
    }
    res.json(specie)
  } catch (error: any) {
    res.status(500).json({ error: 'Error al buscar la especie' })
  }
}

// Crear una nueva especie
export async function createSpecie(req: Request, res: Response) {
  const orm = req.app.get('orm') as MikroORM
  const em = orm.em.fork()

  try {
    const { description } = req.body

    const newSpecie = new Specie()
    newSpecie.description = description

    await em.persistAndFlush(newSpecie)

    res.status(201).json(newSpecie)
  } catch (error: any) {
    res.status(500).json({ error: 'Error al crear la especie' })
  }
}

// Actualizar una especie existente
export async function updateSpecie(req: Request, res: Response) {
  const orm = req.app.get('orm') as MikroORM
  const em = orm.em.fork()

  const id = Number(req.params.id)

  try {
    const specie = await em.findOne(Specie, { idSpecie: id })
    if (!specie) {
      res.status(404).json({ error: 'Especie no encontrada' })
      return
    }

    const { description } = req.body
    specie.description = description ?? specie.description

    await em.persistAndFlush(specie)

    res.json(specie)
  } catch (error: any) {
    res.status(500).json({ error: 'Error al actualizar la especie' })
  }
}

// Eliminar una especie
export async function deleteSpecie(req: Request, res: Response) {
  const orm = req.app.get('orm') as MikroORM
  const em = orm.em.fork()

  const id = Number(req.params.id)

  try {
    const specie = await em.findOne(Specie, { idSpecie: id })
    if (!specie) {
      res.status(404).json({ error: 'Especie no encontrada' })
      return
    }

    await em.removeAndFlush(specie)

    res.json({ message: 'Especie eliminada correctamente' })
  } catch (error: any) {
    res.status(500).json({ error: 'Error al eliminar la especie' })
  }
}
