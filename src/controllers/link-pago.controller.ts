import { Request, Response } from 'express';
import { MikroORM } from '@mikro-orm/core';
import { LinkPago } from '../entities/link-pago.js';
import { User } from '../entities/user.js';

// Crear o actualizar link de pago
export const crearOActualizarLinkPago = async (req: Request, res: Response) => {
  try {
    const orm = req.app.get('orm') as MikroORM;
    const em = orm.em.fork();
    const { url } = req.body;

    // Verificamos que haya usuario autenticado
    if (!req.user?.idUsuario) {
      return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    // Buscamos al usuario con su rol y linkPago
    const user = await em.findOne(User, { idUsuario: req.user.idUsuario }, { populate: ['rol', 'linkPago'] });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    // Solo los refugios pueden crear/actualizar links de pago
    if (user.rol.nombre !== 'refugio') {
      return res.status(403).json({ error: 'Solo los refugios pueden crear links de pago' });
    }

    if (user.linkPago) {
      // 🔁 Actualizar link existente
      user.linkPago.url = url;
      user.linkPago.fechaAlta = new Date();
      await em.flush();
      return res.json({ message: 'Link de pago actualizado', linkPago: user.linkPago });
    }

    // 🆕 Crear nuevo link
    const nuevoLink = em.create(LinkPago, {
      url,
      fechaAlta: new Date(),
      estado: 'activo', // 👈 campo obligatorio
      user,
    });

    await em.persistAndFlush(nuevoLink);

    return res.status(201).json({ message: 'Link de pago creado', linkPago: nuevoLink });
  } catch (err) {
    console.error('Error en crearOActualizarLinkPago:', err);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Listar refugios con su link de pago
export const listarRefugios = async (req: Request, res: Response) => {
  try {
    const orm = req.app.get('orm') as MikroORM;
    const em = orm.em.fork();

    // Buscamos usuarios con rol "refugio" y que tengan linkPago
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
