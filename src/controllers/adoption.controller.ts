import { Request, Response } from 'express';
import { MikroORM } from '@mikro-orm/core';
import { AdoptionService } from '../services/adoption.service.js';

export async function createAdoptionRequest(req: Request, res: Response) {
  const orm = req.app.get('orm') as MikroORM;
  const em = orm.em.fork();
  const service = new AdoptionService(em);

  try {
    const { petId, formData } = req.body;

    if (!req.user) {
      return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    // const userId = req.user!.idUsuario;
    const userId = Number(req.user?.idUsuario);

    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Usuario no autenticado' });
    }
    const request = await service.createAdoptionRequest(userId, petId, formData);

    res.status(201).json({ message: 'Solicitud creada', request });
  } catch (e: any) {
    console.error('Error al crear solicitud:', e);
    res.status(400).json({ error: e.message });
  }
}

export async function getAdoptionRequestsByRefuge(req: Request, res: Response) {
  const orm = req.app.get('orm') as MikroORM;
  const em = orm.em.fork();
  const service = new AdoptionService(em);

  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    const refugeId = Number(req.user.idUsuario);
    // const userId = Number(req.user?.idUsuario);

    if (isNaN(refugeId)) {
      return res.status(400).json({ error: 'Usuario no autenticado' });
    }
    const requests = await service.getAdoptionRequestsByRefuge(refugeId);

    res.json(requests);
  } catch (e: any) {
    console.error('Error al obtener solicitudes:', e);
    res.status(400).json({ error: e.message });
  }
}

export async function updateAdoptionState(req: Request, res: Response) {
  const orm = req.app.get('orm') as MikroORM;
  const em = orm.em.fork();
  const service = new AdoptionService(em);

  try {
    const { id } = req.params;
    const { state } = req.body;

    const result = await service.updateAdoptionState(Number(id), state);

    res.json(result);
  } catch (e: any) {
    console.error('Error al actualizar estado:', e);
    res.status(400).json({ error: e.message });
  }

  
}

export async function getAdoptionRequestsByUser(req: Request, res: Response) {
  const orm = req.app.get('orm') as MikroORM;
  const em = orm.em.fork();
  try {
    const userId = req.user?.idUsuario
if (!userId) {
  return res.status(400).json({ error: 'Usuario no autenticado' })
}
    const service = new AdoptionService(em); 
    const requests = await service.getAdoptionRequestsByUser(userId)
    // console.log('el resquesttt', requests);
    res.json(requests)
  } catch (error) {
    res.status(400).json({ error: (error as Error).message })
  }
}

export async function getAdoptionRequestById(req: Request, res: Response) {
  const orm = req.app.get('orm') as MikroORM
  const em = orm.em.fork()
  const service = new AdoptionService(em)

  try {
    const { id } = req.params
    const request = await service.getAdoptionRequestById(Number(id))
    if (!request) {
      return res.status(404).json({ error: 'Solicitud no encontrada' })
    }
    res.json(request)
  } catch (e: any) {
    console.error('Error al obtener solicitud:', e)
    res.status(400).json({ error: e.message })
  }
}