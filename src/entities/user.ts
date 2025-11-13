import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Role } from './role.js';
@Entity({ tableName: 'user' })
export class User {
  @PrimaryKey({ type: 'number', autoincrement: true, fieldName: 'id_usuario' })
  idUsuario?: number;

  @Property({type: 'string'})
  nombreApellido!: string;

  @Property({ unique: true, type:'string' })
  email!: string;

  @Property({type: 'string'})
  direccion!: string;

  @Property({type: 'string'})
  telefono!: string;

  @Property({type: 'string'})
  tipoDocumento!: string;

  @Property({type: 'string'})
  nroDocumento!: string; 

  @ManyToOne(() => Role, { fieldName: 'rol_id_rol' })
  rol!: Role;

  @Property({type: 'string'})
  password!: string;
}
