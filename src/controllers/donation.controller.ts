import { Donacion } from '../entities/donation.js';
import { LinkPago } from '../entities/link-pago.js';
import { MikroORM } from '@mikro-orm/core';
import { Request, Response } from 'express';
import { User } from '../entities/user.js';

export const crearDonacion = async (req: Request, res: Response) => {
  try {
    const orm = req.app.get('orm') as MikroORM;
    const em = orm.em.fork();

    const { linkPagoId, monto, comentario } = req.body;
    const user = req.user; 

    if (!user) return res.status(401).json({ error: 'Usuario no autenticado' });

    const linkPago = await em.findOne(LinkPago, { id: linkPagoId }, { populate: ['user'] });
    if (!linkPago) return res.status(404).json({ error: 'Link de pago no encontrado' });

    if (user.rol.nombre !== 'user')
      return res.status(403).json({ error: 'Solo los usuarios pueden donar' });

    const donacion = new Donacion();
    donacion.nombre = `${user.nombreApellido} → ${linkPago.user.nombreApellido}`;
    donacion.monto = monto;
    donacion.fecha = new Date();
    donacion.comentario = comentario;
    donacion.donante = user;
    donacion.linkPago = linkPago;

    await em.persistAndFlush(donacion);

    return res.status(201).json({ message: 'Donación registrada', donacion });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error al crear donación' });
  }
};

export const listarDonaciones = async (req: Request, res: Response) => {
  try {
    const orm = req.app.get('orm') as MikroORM;
    const em = orm.em.fork();

    const user = req.user;
    if (!user) return res.status(401).json({ error: 'Usuario no autenticado' });

    let donaciones;
    if (user.rol.nombre === 'usuario') {
      donaciones = await em.find(Donacion, { donante: user }, { populate: ['linkPago.user'] });
    } else if (user.rol.nombre === 'refugio' && user.linkPago) {
      donaciones = await em.find(Donacion, { linkPago: user.linkPago }, { populate: ['donante'] });
    } else {
      return res.status(400).json({ error: 'Usuario sin rol válido o sin link de pago' });
    }

    return res.json(donaciones);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error al listar donaciones' });
  }
};
