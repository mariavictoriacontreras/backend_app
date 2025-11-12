import { Request, Response } from 'express';
import { MikroORM } from '@mikro-orm/core';
import { Pet } from '../entities/pet.js';
import { User } from '../entities/user.js';
import { Specie } from '../entities/specie.js';
import multer from "multer";
import path from "path";

// Obtener todas las mascotas
export async function getPets(req: Request, res: Response) {
  const orm = req.app.get('orm') as MikroORM
  const em = orm.em.fork();

  try {
    const pets = await em.find(Pet, {}, { populate: ['user','specie'] })
    res.json(pets);
  } catch (error: any) {
    res.status(500).json({ error: 'Error al obtener mascotas' });
  }
}

// Obtener una mascota por ID
export async function getPetById(req: Request, res: Response) {
  const orm = req.app.get('orm') as MikroORM;
  const em = orm.em.fork();

  const id = Number(req.params.id);

  try {
  const pet = await em.findOne(Pet, { idPet: id }, { populate: ['user','specie'] });
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
  const orm = req.app.get('orm') as MikroORM;
  const em = orm.em.fork();

  try {
    const { name, birthday, description, userId, specieId, imageUrl } = req.body

    const user = await em.findOne(User, { idUsuario: userId });
    if (!user) return res.status(400).json({ error: 'Usuario no válido' });
    const specie = await em.findOne(Specie, { idSpecie: specieId });
    if (!specie) return res.status(400).json({ error: 'Especie no válida' });

    const newPet = new Pet()
    newPet.name = name
    newPet.birthday = birthday
    newPet.description = description
    newPet.user = user
    newPet.specie = specie
    newPet.imageUrl = imageUrl || null;
    await em.persistAndFlush(newPet)

    res.status(201).json(newPet)
  } catch (error: any) {
    res.status(500).json({ error: 'Error al crear la mascota' })
  }
}

// Actualizar una especie existente
export async function updatePet(req: Request, res: Response) {
  const orm = req.app.get('orm') as MikroORM;
  const em = orm.em.fork();

  const id = Number(req.params.id)

  try {
    const pet = await em.findOne(Pet, { idPet: id })
    if (!pet) {
      res.status(404).json({ error: 'Mascota no encontrada' })
      return
    }

    const { name, birthday, description, userId, specieId, imageUrl } = req.body

    if (userId) {
      const user = await em.findOne(User, { idUsuario: userId });
      if (!user) return res.status(400).json({ error: 'Usuario no válido' });
      pet.user = user;
    }

    if (specieId) {
      const specie = await em.findOne(Specie, { idSpecie: specieId });
      if (!specie) return res.status(400).json({ error: 'Especie no válida' });
      pet.specie = specie;
    }

    pet.name = name ?? pet.name
    pet.birthday = birthday ?? pet.birthday
    pet.description = description ?? pet.description
    pet.imageUrl = imageUrl ?? pet.imageUrl;

    //if birthday string -> Date
    if (birthday) {
      pet.birthday = new Date(birthday);
    }

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

// Configuración de multer
const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    cb(null, "uploads/pets"); // carpeta donde se guardan
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

export const upload = multer({ storage });

// Nuevo endpoint para subir imagen
export async function uploadPetImage(req: Request, res: Response) {
  if (!req.file) {
    return res.status(400).json({ error: "No se subió ninguna imagen" });
  }

  const imageUrl = `/uploads/pets/${req.file.filename}`;
  res.json({ imageUrl });
}

