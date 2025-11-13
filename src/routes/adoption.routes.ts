import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.middleware.js'
import {
  createAdoptionRequest,
  getAdoptionRequestsByRefuge,
  getAdoptionRequestsByUser,
  updateAdoptionState,
  getAdoptionRequestById,
} from '../controllers/adoption.controller.js'
import { validateRole } from '../utils/validateRole.js'

export const adoptionRouter = Router()

// usuario crea solicitud
adoptionRouter.post(
  '/',
  authMiddleware,
  validateRole([2]),
  createAdoptionRequest
)

// refugio ve solicitudes
adoptionRouter.get(
  '/refuge',
  authMiddleware,
  validateRole([3]),
  getAdoptionRequestsByRefuge
)

// refugio cambia estado
adoptionRouter.patch(
  '/:id/state',
  authMiddleware,
  validateRole([3]),
  updateAdoptionState
)

// usuario ve sus solicitudes 
adoptionRouter.get(
  '/user',
  authMiddleware,
  validateRole([2]),
  getAdoptionRequestsByUser
)

// refugio ve una solicitud en detalle
adoptionRouter.get(
  '/:id',
  authMiddleware,
  validateRole([3]),
  getAdoptionRequestById
)