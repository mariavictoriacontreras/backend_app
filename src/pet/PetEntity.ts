import crypto from 'node:crypto'

export class Pet {
  constructor(
    public name: string,
    public birthday: string,
    public size: string,
    public description: string,
    public id = crypto.randomUUID()
  ) {}
}