import { EntityManager } from '@mikro-orm/core'
import { AdoptionRequest } from '../entities/adoption-request.js'
import { Pet } from '../entities/pet.js'
import { User } from '../entities/user.js'

export class AdoptionService {
  private em: EntityManager

  constructor(em: EntityManager) {
    this.em = em
  }

  // 🟢 Crear una solicitud de adopción
  async createAdoptionRequest(userId: number, petId: number, formData: Record<string, any>) {
    const user = await this.em.findOne(User, { idUsuario: userId })
    const pet = await this.em.findOne(Pet, { idPet: petId })

    if (!user) throw new Error('Usuario no encontrado')
    if (!pet) throw new Error('Mascota no encontrada')

    // ✅ Creamos la solicitud con todos los datos del formulario
    const request = this.em.create(AdoptionRequest, {
      date: new Date(),
      state: 'pendiente',
      user,
      pet,
      ...formData, // acá entran las respuestas del formulario
    })
    // console.log('request', request);
    await this.em.persistAndFlush(request)
    return request
  }

  // 🟣 Obtener solicitudes de adopción de un refugio
  async getAdoptionRequestsByRefuge(refugeId: number) {
    const pets = await this.em.find(Pet, { user: { idUsuario: refugeId } })

    if (pets.length === 0) return []

    const petIds = pets.map((p) => p.idPet)

    return await this.em.find(
      AdoptionRequest,
      { pet: { idPet: { $in: petIds } } },
      { populate: ['user', 'pet'] }
    )
  }

  // 🟡 Actualizar el estado de una solicitud
  async updateAdoptionState(id: number, state: string) {
    const request = await this.em.findOne(AdoptionRequest, { idRequest: id })
    if (!request) throw new Error('Solicitud no encontrada')

    request.state = state
    await this.em.flush()

    return request
  }

  async getAdoptionRequestsByUser(userId: number) {
  return await this.em.find(
    AdoptionRequest,
    { user: { idUsuario: userId } },
    { populate: ['pet'] }
  )
}
}
