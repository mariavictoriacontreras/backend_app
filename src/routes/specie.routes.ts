import { Router } from 'express'
import {
  getSpecies,
  getSpecieById,
  createSpecie,
  updateSpecie,
  deleteSpecie
} from '../controllers/specie.controller.js'

export const specieRouter = Router()

specieRouter.get('/', getSpecies)
specieRouter.get('/:id', getSpecieById)
specieRouter.post('/', createSpecie)
specieRouter.put('/:id', updateSpecie)
specieRouter.delete('/:id', deleteSpecie)
