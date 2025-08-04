import crypto from 'node:crypto'

export class Pet {
  constructor(
    public name: string,
    public birthday: string,
    public description: string,
    public user_id: number,
    public specie_id: number,        
    public id ?: number
  ) {}
}