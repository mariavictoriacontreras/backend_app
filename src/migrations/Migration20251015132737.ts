import { Migration } from '@mikro-orm/migrations';

export class Migration20251015132737 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`roles\` (\`id_rol\` int unsigned not null auto_increment primary key, \`nombre\` varchar(255) not null) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`roles\` add unique \`roles_nombre_unique\`(\`nombre\`);`);

    this.addSql(`alter table \`user\` drop column \`rol\`;`);

    this.addSql(`alter table \`user\` add \`rol_id_rol\` int unsigned not null;`);
    this.addSql(`alter table \`user\` add constraint \`user_rol_id_rol_foreign\` foreign key (\`rol_id_rol\`) references \`roles\` (\`id_rol\`) on update cascade;`);
    this.addSql(`alter table \`user\` add index \`user_rol_id_rol_index\`(\`rol_id_rol\`);`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`user\` drop foreign key \`user_rol_id_rol_foreign\`;`);

    this.addSql(`drop table if exists \`roles\`;`);

    this.addSql(`alter table \`user\` drop index \`user_rol_id_rol_index\`;`);
    this.addSql(`alter table \`user\` drop column \`rol_id_rol\`;`);

    this.addSql(`alter table \`user\` add \`rol\` varchar(255) not null;`);
  }

}
