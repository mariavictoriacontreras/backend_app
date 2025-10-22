import { Entity, PrimaryKey, Property, OneToOne, OneToMany, ManyToOne, Collection } from '@mikro-orm/core';
import { Role } from './role.js';
import { LinkPago } from './link-pago.js';
import { Donacion } from './donation.js';

@Entity({ tableName: 'user' })
export class User {
  @PrimaryKey({type: 'number', autoincrement: true })
  idUsuario?: number;

  @Property({type: 'string'})
  nombreApellido!: string;

  @Property({ type: 'string' ,unique: true })
  email!: string;

  @Property({type: 'string'})
  direccion!: string;

  @Property({ type: 'string'})
  telefono!: string;

  @Property({type: 'string'})
  tipoDocumento!: string;

  @Property({type: 'string'})
  nroDocumento!: string;

  @ManyToOne(() => Role)
  rol!: Role;

  @Property({type: 'string'})
  password!: string;

  // 👇 LADO INVERSO — sin FK, solo referencia al otro lado
  @OneToOne(() => LinkPago, linkPago => linkPago.user, { mappedBy: 'user', nullable: true })
  linkPago?: LinkPago;

  @OneToMany(() => Donacion, donacion => donacion.donante)
  donaciones = new Collection<Donacion>(this);
}
