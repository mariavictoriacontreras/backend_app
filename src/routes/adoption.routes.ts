import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.middleware.js'
import {
  createAdoptionRequest,
  getAdoptionRequestsByRefuge,
  getAdoptionRequestsByUser,
  updateAdoptionState,
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
  validateRole([1]),
  updateAdoptionState
)

// usuario ve sus solicitudes 
adoptionRouter.get(
  '/user',
  authMiddleware,
  validateRole([2]),
  getAdoptionRequestsByUser
)
