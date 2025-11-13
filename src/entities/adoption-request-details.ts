import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { AdoptionRequest } from './adoption-request.js';

@Entity({ tableName: 'adoptionRequestDetails' })
export class AdoptionRequestDetails {
  @PrimaryKey({ type: 'number', autoincrement: true })
  id!: number;

  @ManyToOne(() => AdoptionRequest, { fieldName: 'request_id' })
  request!: AdoptionRequest;

  @Property({ type: 'json' })
  answers!: Record<string, any>; 
}
