import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { User } from './user.js';
import { Pet } from './pet.js';

@Entity({ tableName: 'adoptionRequest' })
export class AdoptionRequest {
  @PrimaryKey({ type: 'number', autoincrement: true, fieldName: 'id' })
  idRequest?: number;

  @Property({ type: 'datetime', nullable: true })
  date?: Date;

  @Property({ type: 'string' })
  state?: string;

  @ManyToOne(() => User, { fieldName: 'user_id' })
  user!: User;

  @ManyToOne(() => Pet, { fieldName: 'pet_id' })
  pet!: Pet;

   // 📝 Campos del formulario
 @Property({ type: 'string', nullable: true, fieldName: 'full_name' }) fullName?: string;
@Property({ type: 'string', nullable: true }) address?: string;
@Property({ type: 'string', nullable: true }) location?: string;
@Property({ type: 'string', nullable: true }) contact?: string;

@Property({ type: 'boolean', nullable: true, fieldName: 'has_yard' }) hasYard?: boolean;
@Property({ type: 'boolean', nullable: true, fieldName: 'agrees_indoor' }) agreesIndoor?: boolean;
@Property({ type: 'boolean', nullable: true, fieldName: 'will_use_leash' }) willUseLeash?: boolean;
@Property({ type: 'boolean', nullable: true, fieldName: 'agrees_no_wandering' }) agreesNoWandering?: boolean;
@Property({ type: 'boolean', nullable: true, fieldName: 'has_other_pets' }) hasOtherPets?: boolean;
@Property({ type: 'boolean', nullable: true, fieldName: 'other_pets_neutered' }) otherPetsNeutered?: boolean;
@Property({ type: 'boolean', nullable: true, fieldName: 'other_pets_aggressive' }) otherPetsAggressive?: boolean;
@Property({ type: 'boolean', nullable: true, fieldName: 'agrees_neuter' }) agreesNeuter?: boolean;
@Property({ type: 'boolean', nullable: true, fieldName: 'agrees_vaccinate' }) agreesVaccinate?: boolean;
@Property({ type: 'boolean', nullable: true, fieldName: 'agrees_rabies' }) agreesRabies?: boolean;
@Property({ type: 'boolean', nullable: true, fieldName: 'agrees_deworm' }) agreesDeworm?: boolean;
@Property({ type: 'boolean', nullable: true, fieldName: 'agrees_quality_food' }) agreesQualityFood?: boolean;
@Property({ type: 'boolean', nullable: true, fieldName: 'agrees_vet_check' }) agreesVetCheck?: boolean;

@Property({ type: 'string', nullable: true, fieldName: 'hours_alone' }) hoursAlone?: string;
@Property({ type: 'string', nullable: true, fieldName: 'walks_per_day' }) walksPerDay?: string;
@Property({ type: 'string', nullable: true, fieldName: 'caretaker_during_trips' }) caretakerDuringTrips?: string;
@Property({ type: 'string', nullable: true, fieldName: 'return_reason' }) returnReason?: string;
@Property({ type: 'boolean', nullable: true, fieldName: 'windows_protected' }) windowsProtected?: boolean;
@Property({ type: 'boolean', nullable: true, fieldName: 'agrees_followup' }) agreesFollowup?: boolean;
@Property({ type: 'boolean', nullable: true, fieldName: 'agrees_interview' }) agreesInterview?: boolean;

@Property({ type: 'string', nullable: true, fieldName: 'household_info' }) householdInfo?: string;
@Property({ type: 'boolean', nullable: true, fieldName: 'owns_home' }) ownsHome?: boolean;
@Property({ type: 'boolean', nullable: true, fieldName: 'can_have_pets' }) canHavePets?: boolean;

}
