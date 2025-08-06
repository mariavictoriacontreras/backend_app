import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'user' })
export class User {
  @PrimaryKey()
  idUsuario!: number;

  @Property()
  nombreApellido!: string;

  @Property({ unique: true })
  email!: string;

  @Property()
  direccion!: string;

  @Property()
  telefono!: string;

  @Property()
  rol!: string;
}
