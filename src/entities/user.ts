import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'user' })
export class User {
  @PrimaryKey({ type: 'number' , autoincrement: true, fieldName: 'id'  })
  idUsuario?: number;

  @Property({ type: 'string' })
  nombreApellido!: string;

  @Property({ type: 'string' , unique: true })
  email!: string;

  @Property({ type: 'string' })
  direccion!: string;

  @Property({ type: 'string' })
  telefono!: string;

  @Property({ type: 'string' })
  rol!: string;

  @Property({ type: 'string' })
  password!: string;
}
