import { Router } from "express";
import { sanitizePetInput, findAll, findOne, add, update, remove } from "./PetController.js";

export const petRouter = Router()

petRouter.get('/',findAll)
petRouter.get('/:id', findOne)
petRouter.post('/', sanitizePetInput, add)
petRouter.put('/:id', sanitizePetInput, update)
petRouter.patch('/:id', sanitizePetInput, update)
petRouter.delete('/:id', remove)