import { Entity, PrimaryKey, Property, OneToMany, Collection } from '@mikro-orm/core';
import { User } from './user.js';

@Entity({ tableName: 'roles' })
export class Role {
  @PrimaryKey({ type: 'number', autoincrement: true })
  idRol?: number;

  @Property({ type: 'string', unique: true })
  nombre!: string;

  @OneToMany(() => User, user => user.rol)
  users = new Collection<User>(this);
}
