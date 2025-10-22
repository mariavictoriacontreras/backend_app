import { Entity, PrimaryKey, Property, OneToOne, OneToMany, Collection } from '@mikro-orm/core';
import { User } from './user.js';
import { Donacion } from './donation.js';

@Entity({ tableName: 'link_pago' })
export class LinkPago {
  @PrimaryKey({ type: 'number', autoincrement: true })
  id?: number;

  @Property({type:'string'})
  url!: string;

  @Property({ type: 'date', nullable: true })
  fechaAlta?: Date;

  @Property({ type: 'date', nullable: true })
  fechaBaja?: Date;

  @Property({ type: 'string', default: 'activo' })
  estado!: string;

  // 👇 Este es el LADO DUEÑO — tiene la FK user_id
  @OneToOne(() => User, user => user.linkPago, { owner: true })
  user!: User;

  @OneToMany(() => Donacion, donacion => donacion.linkPago)
  donaciones = new Collection<Donacion>(this);
}
