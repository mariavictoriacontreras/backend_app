import { Migration } from '@mikro-orm/migrations';

export class Migration20251113224147 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`role\` (\`id\` int unsigned not null auto_increment primary key, \`nombre\` varchar(255) not null) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`role\` add unique \`role_nombre_unique\`(\`nombre\`);`);

    this.addSql(`create table \`specie\` (\`id\` int unsigned not null auto_increment primary key, \`description\` varchar(255) not null) default character set utf8mb4 engine = InnoDB;`);

    this.addSql(`create table \`user\` (\`id\` int unsigned not null auto_increment primary key, \`nombre_apellido\` varchar(255) not null, \`email\` varchar(255) not null, \`direccion\` varchar(255) not null, \`telefono\` varchar(255) not null, \`tipo_documento\` varchar(255) not null, \`nro_documento\` varchar(255) not null, \`id_rol\` int unsigned not null, \`password\` varchar(255) not null) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`user\` add unique \`user_email_unique\`(\`email\`);`);
    this.addSql(`alter table \`user\` add index \`user_id_rol_index\`(\`id_rol\`);`);

    this.addSql(`create table \`pet\` (\`id\` int unsigned not null auto_increment primary key, \`name\` varchar(255) not null, \`birthday\` datetime null, \`description\` varchar(255) not null, \`image_url\` varchar(255) null, \`id_usuario\` int unsigned not null, \`specie_id\` int unsigned not null) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`pet\` add index \`pet_id_usuario_index\`(\`id_usuario\`);`);
    this.addSql(`alter table \`pet\` add index \`pet_specie_id_index\`(\`specie_id\`);`);

    this.addSql(`create table \`adoptionRequest\` (\`id\` int unsigned not null auto_increment primary key, \`date\` datetime null, \`state\` varchar(255) not null, \`user_id\` int unsigned not null, \`pet_id\` int unsigned not null, \`full_name\` varchar(255) null, \`address\` varchar(255) null, \`location\` varchar(255) null, \`contact\` varchar(255) null, \`has_yard\` tinyint(1) null, \`agrees_indoor\` tinyint(1) null, \`will_use_leash\` tinyint(1) null, \`agrees_no_wandering\` tinyint(1) null, \`has_other_pets\` tinyint(1) null, \`other_pets_neutered\` tinyint(1) null, \`other_pets_aggressive\` tinyint(1) null, \`agrees_neuter\` tinyint(1) null, \`agrees_vaccinate\` tinyint(1) null, \`agrees_rabies\` tinyint(1) null, \`agrees_deworm\` tinyint(1) null, \`agrees_quality_food\` tinyint(1) null, \`agrees_vet_check\` tinyint(1) null, \`hours_alone\` varchar(255) null, \`walks_per_day\` varchar(255) null, \`caretaker_during_trips\` varchar(255) null, \`return_reason\` varchar(255) null, \`windows_protected\` tinyint(1) null, \`agrees_followup\` tinyint(1) null, \`agrees_interview\` tinyint(1) null, \`household_info\` varchar(255) null, \`owns_home\` tinyint(1) null, \`can_have_pets\` tinyint(1) null) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`adoptionRequest\` add index \`adoptionRequest_user_id_index\`(\`user_id\`);`);
    this.addSql(`alter table \`adoptionRequest\` add index \`adoptionRequest_pet_id_index\`(\`pet_id\`);`);

    this.addSql(`alter table \`user\` add constraint \`user_id_rol_foreign\` foreign key (\`id_rol\`) references \`role\` (\`id\`) on update cascade;`);

    this.addSql(`alter table \`pet\` add constraint \`pet_id_usuario_foreign\` foreign key (\`id_usuario\`) references \`user\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`pet\` add constraint \`pet_specie_id_foreign\` foreign key (\`specie_id\`) references \`specie\` (\`id\`) on update cascade;`);

    this.addSql(`alter table \`adoptionRequest\` add constraint \`adoptionRequest_user_id_foreign\` foreign key (\`user_id\`) references \`user\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`adoptionRequest\` add constraint \`adoptionRequest_pet_id_foreign\` foreign key (\`pet_id\`) references \`pet\` (\`id\`) on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`user\` drop foreign key \`user_id_rol_foreign\`;`);

    this.addSql(`alter table \`pet\` drop foreign key \`pet_specie_id_foreign\`;`);

    this.addSql(`alter table \`pet\` drop foreign key \`pet_id_usuario_foreign\`;`);

    this.addSql(`alter table \`adoptionRequest\` drop foreign key \`adoptionRequest_user_id_foreign\`;`);

    this.addSql(`alter table \`adoptionRequest\` drop foreign key \`adoptionRequest_pet_id_foreign\`;`);

    this.addSql(`drop table if exists \`role\`;`);

    this.addSql(`drop table if exists \`specie\`;`);

    this.addSql(`drop table if exists \`user\`;`);

    this.addSql(`drop table if exists \`pet\`;`);

    this.addSql(`drop table if exists \`adoptionRequest\`;`);
  }

}
