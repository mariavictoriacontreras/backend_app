import { Router } from 'express'
import {
  getPets,
  getPetById,
  createPet,
  updatePet,
  deletePet
} from '../controllers/pet.controller.js'

export const petRouter = Router()

petRouter.get('/', getPets)
petRouter.get('/:id', getPetById)
petRouter.post('/', createPet)
petRouter.put('/:id', updatePet)
petRouter.delete('/:id', deletePet)
