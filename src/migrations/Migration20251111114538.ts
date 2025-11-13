import { Migration } from '@mikro-orm/migrations';

export class Migration20251111114538 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`roles\` (\`id_rol\` int unsigned not null auto_increment primary key, \`nombre\` varchar(255) not null) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`roles\` add unique \`roles_nombre_unique\`(\`nombre\`);`);

    this.addSql(`create table \`specie\` (\`id\` int unsigned not null auto_increment primary key, \`description\` varchar(255) not null) default character set utf8mb4 engine = InnoDB;`);

    this.addSql(`create table \`user\` (\`id_usuario\` int unsigned not null auto_increment primary key, \`nombre_apellido\` varchar(255) not null, \`email\` varchar(255) not null, \`direccion\` varchar(255) not null, \`telefono\` varchar(255) not null, \`tipo_documento\` varchar(255) not null, \`nro_documento\` varchar(255) not null, \`rol_id_rol\` int unsigned not null, \`password\` varchar(255) not null) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`user\` add unique \`user_email_unique\`(\`email\`);`);
    this.addSql(`alter table \`user\` add index \`user_rol_id_rol_index\`(\`rol_id_rol\`);`);

    this.addSql(`create table \`pet\` (\`id\` int unsigned not null auto_increment primary key, \`name\` varchar(255) not null, \`birthday\` datetime null, \`description\` varchar(255) not null, \`id_usuario\` int unsigned not null, \`specie_id\` int unsigned not null) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`pet\` add index \`pet_id_usuario_index\`(\`id_usuario\`);`);
    this.addSql(`alter table \`pet\` add index \`pet_specie_id_index\`(\`specie_id\`);`);

    this.addSql(`create table \`adoptionRequest\` (\`id\` int unsigned not null auto_increment primary key, \`date\` datetime null, \`state\` varchar(255) not null, \`user_id\` int unsigned not null, \`pet_id\` int unsigned not null) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`adoptionRequest\` add index \`adoptionRequest_user_id_index\`(\`user_id\`);`);
    this.addSql(`alter table \`adoptionRequest\` add index \`adoptionRequest_pet_id_index\`(\`pet_id\`);`);

    this.addSql(`alter table \`user\` add constraint \`user_rol_id_rol_foreign\` foreign key (\`rol_id_rol\`) references \`roles\` (\`id_rol\`) on update cascade;`);

    this.addSql(`alter table \`pet\` add constraint \`pet_id_usuario_foreign\` foreign key (\`id_usuario\`) references \`user\` (\`id_usuario\`) on update cascade;`);
    this.addSql(`alter table \`pet\` add constraint \`pet_specie_id_foreign\` foreign key (\`specie_id\`) references \`specie\` (\`id\`) on update cascade;`);

    this.addSql(`alter table \`adoptionRequest\` add constraint \`adoptionRequest_user_id_foreign\` foreign key (\`user_id\`) references \`user\` (\`id_usuario\`) on update cascade;`);
    this.addSql(`alter table \`adoptionRequest\` add constraint \`adoptionRequest_pet_id_foreign\` foreign key (\`pet_id\`) references \`pet\` (\`id\`) on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`user\` drop foreign key \`user_rol_id_rol_foreign\`;`);

    this.addSql(`alter table \`pet\` drop foreign key \`pet_specie_id_foreign\`;`);

    this.addSql(`alter table \`pet\` drop foreign key \`pet_id_usuario_foreign\`;`);

    this.addSql(`alter table \`adoptionRequest\` drop foreign key \`adoptionRequest_user_id_foreign\`;`);

    this.addSql(`alter table \`adoptionRequest\` drop foreign key \`adoptionRequest_pet_id_foreign\`;`);

    this.addSql(`drop table if exists \`roles\`;`);

    this.addSql(`drop table if exists \`specie\`;`);

    this.addSql(`drop table if exists \`user\`;`);

    this.addSql(`drop table if exists \`pet\`;`);

    this.addSql(`drop table if exists \`adoptionRequest\`;`);
  }

}
