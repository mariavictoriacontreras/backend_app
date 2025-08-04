import { Repository } from '../shared/repository.js'
import { Pet } from './PetEntity.js'
import { pool } from '../shared/db/conn.mysql.js'
import { ResultSetHeader, RowDataPacket } from 'mysql2'

export class PetRepository implements Repository<Pet> {
  public async findAll(): Promise<Pet[] | undefined> {
    const [pets] = await pool.query('SELECT * FROM pet')
    return pets as Pet[]
  }

  public async findOne(item: { id: string }): Promise<Pet | undefined> {
    const id = Number.parseInt(item.id)
    const [pets] = await pool.query<RowDataPacket[]>('SELECT * FROM pet WHERE id_pet = ?', [id])
    if (pets.length === 0) {
      return undefined
    }
    return pets[0] as Pet
  }

  public async add(petInput: Pet): Promise<Pet | undefined> {
    const { id, ...petRow } = petInput
    const [result] = await pool.query<ResultSetHeader>('INSERT INTO pet SET ?', [petRow])
    petInput.id = result.insertId
    return petInput
  }

  public async update(id: string, petInput: Pet): Promise<Pet | undefined> {
    const petId = Number.parseInt(id)
    await pool.query('UPDATE pet SET ? WHERE id_pet = ?', [petInput, petId])
    return await this.findOne({ id })
  }

  public async delete(item: { id: string }): Promise<Pet | undefined> {
    try {
      const petToDelete = await this.findOne(item)
      const petId = Number.parseInt(item.id)
      await pool.query('DELETE FROM pet WHERE id_pet = ?', [petId])
      return petToDelete
    } catch (error: any) {
      throw new Error('unable to delete pet')
    }
  }
}
