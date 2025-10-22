import { Router } from 'express'
import { crearOActualizarLinkPago, listarRefugios } from '../controllers/link-pago.controller';
import { authMiddleware } from '../middleware/auth.middleware';

export const linkPagoRoutes = Router()

linkPagoRoutes.post('/', authMiddleware, crearOActualizarLinkPago); // POST /link-pago
linkPagoRoutes.get('/refugios', listarRefugios); // GET /link-pago/refugios

