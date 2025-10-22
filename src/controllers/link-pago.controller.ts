import { Request, Response } from 'express';
import { MikroORM } from '@mikro-orm/core';
import { LinkPago } from '../entities/link-pago.js';
import { User } from '../entities/user.js';

export const crearOActualizarLinkPago = async (req: Request, res: Response) => {
  try {
    const orm = req.app.get('orm') as MikroORM;
    const em = orm.em.fork();
    const { url } = req.body;

    if (!req.user?.idUsuario) {
      return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    const user = await em.findOne(User, { idUsuario: req.user.idUsuario }, { populate: ['rol', 'linkPago'] });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    if (user.rol.nombre !== 'refugio') {
      return res.status(403).json({ error: 'Solo los refugios pueden crear links de pago' });
    }

    if (user.linkPago) {
      
      user.linkPago.url = url;
      user.linkPago.fechaAlta = new Date();
      await em.flush();
      return res.json({ message: 'Link de pago actualizado', linkPago: user.linkPago });
    }

    const nuevoLink = em.create(LinkPago, {
      url,
      fechaAlta: new Date(),
      estado: 'activo', 
      user,
    });

    await em.persistAndFlush(nuevoLink);

    return res.status(201).json({ message: 'Link de pago creado', linkPago: nuevoLink });
  } catch (err) {
    console.error('Error en crearOActualizarLinkPago:', err);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const listarRefugios = async (req: Request, res: Response) => {
  try {
    const orm = req.app.get('orm') as MikroORM;
    const em = orm.em.fork();

    const refugios = await em.find(
      User,
      { rol: { nombre: 'refugio' } },
      { populate: ['linkPago', 'rol'] }
    );

    const resultado = refugios.map((r) => ({
      id: r.idUsuario,
      nombre: r.nombreApellido,
      email: r.email,
      linkPago: r.linkPago ? r.linkPago.url : null,
    }));

    return res.json(resultado);
  } catch (err) {
    console.error('Error en listarRefugios:', err);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
