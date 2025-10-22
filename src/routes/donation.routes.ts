import { Router } from 'express'
import { crearDonacion, listarDonaciones } from '../controllers/donation.controller.js';
import { authMiddleware } from '../middleware/auth.middleware';

export const donationRoutes = Router()

donationRoutes.post('/', authMiddleware, crearDonacion);
donationRoutes.get('/', authMiddleware, listarDonaciones);

