import { Request, Response, NextFunction } from "express"
import { PetRepository } from "./PetRepository.js"
import { Pet } from "./PetEntity.js"

const repository = new PetRepository

function sanitizePetInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    name: req.body.name,
    birthday: req.body.birthday,
    size: req.body.size,
    description: req.body.description,
  }

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key]
    }
  })
  next()
}

function findAll(req:Request, res:Response) {
  res.json({ data: repository.findAll() })
}

function findOne(req:Request, res:Response) {
    const id = req.params.id
  const pet = repository.findOne({id})
  if (!pet) {
    return res.status(404).send({ message: 'Pet not found' })
  }
  res.json({ data: pet })
}

function add(req:Request, res:Response) {
  const input = req.body.sanitizedInput

  const petInput = new Pet(
    input.name,
    input.birthday,
    input.size,
    input.description,
  )

  const pet = repository.add(petInput)
  return res.status(201).send({ message: 'Pet created', data: pet })
}

function update(req:Request, res:Response) {
  req.body.sanitizedInput.id=req.params.id
  const pet = repository.update(req.body.sanitizedInput)

  if (!pet) {
    return res.status(404).send({ message: 'Pet not found' })
  }

  return res.status(200).send({ message: 'Pet updated successfully', data: pet })
}

function remove(req:Request, res:Response) {
  const id = req.params.id
  const pet = repository.delete({id})

  if (!pet) {
    res.status(404).send({ message: 'Pet not found' })
  } else {
    res.status(200).send({ message: 'Pet deleted successfully' })
  }
}

export {sanitizePetInput, findAll, findOne, add, update, remove}