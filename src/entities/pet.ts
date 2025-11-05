import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { User } from './user.js';
import { Specie } from './specie.js';

@Entity({ tableName: 'pet' })
export class Pet {
  @PrimaryKey({ type: 'number', autoincrement: true, fieldName: 'id' })
  idPet!: number;

  @Property({ type: 'string' })
  name!: string;

  @Property({ type: 'datetime', nullable: true })
  birthday?: Date;

  @Property({ type: 'string' })
  description!: string;

  @ManyToOne(() => User, { fieldName: 'user_id' })
  user!: User;

  @ManyToOne(() => Specie, { fieldName: 'specie_id' })
  specie!: Specie;
}
