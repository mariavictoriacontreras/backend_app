import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'specie' })
export class Specie {
  @PrimaryKey({ type: 'number', autoincrement: true, fieldName: 'id'  })
  idSpecie!: number;

  @Property({ type: 'string' })
  description!: string;
}
