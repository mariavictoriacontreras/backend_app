import { Request, Response, NextFunction } from 'express'
import { PetRepository } from './PetRepository.js'
import { Pet } from './PetEntity.js'

const repository = new PetRepository()

function sanitizePetInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    name: req.body.name,
    birthday: req.body.birthday,
    description: req.body.description,
    user_id: req.body.user_id,
    specie_id: req.body.specie_id,
  }

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key]
    }
  })
  next()
}

async function findAll(req: Request, res: Response) {
  res.json({ data: await repository.findAll() })
}

async function findOne(req: Request, res: Response) {
  const id = req.params.id
  const pet = await repository.findOne({ id })
  if (!pet) {
    return res.status(404).send({ message: 'Pet not found' })
  }
  res.json({ data: pet })
}

async function add(req: Request, res: Response) {
  const input = req.body.sanitizedInput

  const petInput = new Pet(
    input.name,
    input.birthday,
    input.description,
    input.user_id,
    input.specie_id,
  )

  const pet = await repository.add(petInput)
  return res.status(201).send({ message: 'Pet created', data: pet })
}

async function update(req: Request, res: Response) {
  const pet = await repository.update(req.params.id, req.body.sanitizedInput)

  if (!pet) {
    return res.status(404).send({ message: 'Pet not found' })
  }

  return res.status(200).send({ message: 'Pet updated successfully', data: pet })
}

async function remove(req: Request, res: Response) {
  const id = req.params.id
  const pet = await repository.delete({ id })

  if (!pet) {
    res.status(404).send({ message: 'Pet not found' })
  } else {
    res.status(200).send({ message: 'Pet deleted successfully' })
  }
}

export { sanitizePetInput, findAll, findOne, add, update, remove }