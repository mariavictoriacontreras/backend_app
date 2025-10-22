import { Migration } from '@mikro-orm/migrations';

export class Migration20251021133817 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`link_pago\` (\`id\` int unsigned not null auto_increment primary key, \`url\` varchar(255) not null, \`fecha_alta\` date null, \`fecha_baja\` date null, \`estado\` varchar(255) not null default 'activo', \`user_id_usuario\` int unsigned not null) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`link_pago\` add unique \`link_pago_user_id_usuario_unique\`(\`user_id_usuario\`);`);

    this.addSql(`create table \`donaciones\` (\`id\` int unsigned not null auto_increment primary key, \`nombre\` varchar(255) not null, \`fecha\` date null, \`comentario\` varchar(255) null, \`monto\` int not null, \`donante_id_usuario\` int unsigned not null, \`link_pago_id\` int unsigned not null) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`donaciones\` add index \`donaciones_donante_id_usuario_index\`(\`donante_id_usuario\`);`);
    this.addSql(`alter table \`donaciones\` add index \`donaciones_link_pago_id_index\`(\`link_pago_id\`);`);

    this.addSql(`alter table \`link_pago\` add constraint \`link_pago_user_id_usuario_foreign\` foreign key (\`user_id_usuario\`) references \`user\` (\`id_usuario\`) on update cascade;`);

    this.addSql(`alter table \`donaciones\` add constraint \`donaciones_donante_id_usuario_foreign\` foreign key (\`donante_id_usuario\`) references \`user\` (\`id_usuario\`) on update cascade;`);
    this.addSql(`alter table \`donaciones\` add constraint \`donaciones_link_pago_id_foreign\` foreign key (\`link_pago_id\`) references \`link_pago\` (\`id\`) on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`donaciones\` drop foreign key \`donaciones_link_pago_id_foreign\`;`);

    this.addSql(`drop table if exists \`link_pago\`;`);

    this.addSql(`drop table if exists \`donaciones\`;`);
  }

}
