import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { LinkPago } from './link-pago.js';
import { User } from './user.js';

@Entity({ tableName: 'donaciones' })
export class Donacion {
  @PrimaryKey({ type: 'number', autoincrement: true })
  id!: number;

  @Property({ type: 'string' })
  nombre!: string;

  @Property({ type: 'date', nullable: true })
  fecha?: Date;

  @Property({ type: 'string', nullable: true })
  comentario?: string;

  @Property({ type: 'number' })
  monto!: number;

  // Usuario que hace la donación
  @ManyToOne(() => User, { nullable: false })
  donante!: User;

  // Link de pago al que se hace la donación
  @ManyToOne(() => LinkPago, { nullable: false })
  linkPago!: LinkPago;
}
