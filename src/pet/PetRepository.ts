import { Repository } from "../shared/repository.js";
import { Pet } from "./PetEntity.js"

const pets = [
  new Pet(
    'Alegria',
    '10-05-2014',
    'small',
    'blanca',
    'a02b91bc-3769-4221-beb1-d7a3aeba7dad'
  ),
]

export class PetRepository implements Repository<Pet>{

    public findAll(): Pet[] | undefined {
        return pets
    }

    public findOne(item: { id: string }): Pet | undefined {
        return pets.find((pet) => pet.id === item.id);
    }

    public add(item: Pet): Pet | undefined {
        pets.push(item)
        return item
    }

    public update(item: Pet): Pet | undefined {
        const petIdx = pets.findIndex((pet) => pet.id === item.id)

  if (petIdx !== -1) {
      pets[petIdx] = { ...pets[petIdx], ...item }
        }
        return pets[petIdx]
    }

    public delete(item: { id: string; }): Pet | undefined {
        const petIdx = pets.findIndex((pet) => pet.id === item.id)

  if (petIdx !== -1)  {
    const deletedPets = pets[petIdx]
    pets.splice(petIdx, 1)
    return deletedPets
  }
    }
}