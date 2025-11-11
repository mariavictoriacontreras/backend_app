import { Migration } from '@mikro-orm/migrations';

export class Migration20251111124523 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`adoptionRequest\` add \`full_name\` varchar(255) null, add \`address\` varchar(255) null, add \`location\` varchar(255) null, add \`contact\` varchar(255) null, add \`has_yard\` tinyint(1) null, add \`agrees_indoor\` tinyint(1) null, add \`will_use_leash\` tinyint(1) null, add \`agrees_no_wandering\` tinyint(1) null, add \`has_other_pets\` tinyint(1) null, add \`other_pets_neutered\` tinyint(1) null, add \`other_pets_aggressive\` tinyint(1) null, add \`agrees_neuter\` tinyint(1) null, add \`agrees_vaccinate\` tinyint(1) null, add \`agrees_rabies\` tinyint(1) null, add \`agrees_deworm\` tinyint(1) null, add \`agrees_quality_food\` tinyint(1) null, add \`agrees_vet_check\` tinyint(1) null, add \`hours_alone\` varchar(255) null, add \`walks_per_day\` varchar(255) null, add \`caretaker_during_trips\` varchar(255) null, add \`return_reason\` varchar(255) null, add \`windows_protected\` tinyint(1) null, add \`agrees_followup\` tinyint(1) null, add \`agrees_interview\` tinyint(1) null, add \`household_info\` varchar(255) null, add \`owns_home\` tinyint(1) null, add \`can_have_pets\` tinyint(1) null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`adoptionRequest\` drop column \`full_name\`, drop column \`address\`, drop column \`location\`, drop column \`contact\`, drop column \`has_yard\`, drop column \`agrees_indoor\`, drop column \`will_use_leash\`, drop column \`agrees_no_wandering\`, drop column \`has_other_pets\`, drop column \`other_pets_neutered\`, drop column \`other_pets_aggressive\`, drop column \`agrees_neuter\`, drop column \`agrees_vaccinate\`, drop column \`agrees_rabies\`, drop column \`agrees_deworm\`, drop column \`agrees_quality_food\`, drop column \`agrees_vet_check\`, drop column \`hours_alone\`, drop column \`walks_per_day\`, drop column \`caretaker_during_trips\`, drop column \`return_reason\`, drop column \`windows_protected\`, drop column \`agrees_followup\`, drop column \`agrees_interview\`, drop column \`household_info\`, drop column \`owns_home\`, drop column \`can_have_pets\`;`);
  }

}
