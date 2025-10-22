import { Migration } from '@mikro-orm/migrations';

export class Migration20251022132228 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`link_pago\` drop foreign key \`link_pago_user_id_usuario_foreign\`;`);

    this.addSql(`alter table \`donaciones\` drop foreign key \`donaciones_donante_id_usuario_foreign\`;`);

    this.addSql(`alter table \`user\` modify \`id_usuario\` int unsigned not null auto_increment;`);

    this.addSql(`alter table \`link_pago\` modify \`user_id_usuario\` int unsigned not null;`);
    this.addSql(`alter table \`link_pago\` add constraint \`link_pago_user_id_usuario_foreign\` foreign key (\`user_id_usuario\`) references \`user\` (\`id_usuario\`) on update cascade;`);

    this.addSql(`alter table \`donaciones\` modify \`donante_id_usuario\` int unsigned not null;`);
    this.addSql(`alter table \`donaciones\` add constraint \`donaciones_donante_id_usuario_foreign\` foreign key (\`donante_id_usuario\`) references \`user\` (\`id_usuario\`) on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`link_pago\` drop foreign key \`link_pago_user_id_usuario_foreign\`;`);

    this.addSql(`alter table \`donaciones\` drop foreign key \`donaciones_donante_id_usuario_foreign\`;`);

    this.addSql(`alter table \`user\` modify \`id_usuario\` varchar(255) not null;`);

    this.addSql(`alter table \`link_pago\` modify \`user_id_usuario\` varchar(255) not null;`);
    this.addSql(`alter table \`link_pago\` add constraint \`link_pago_user_id_usuario_foreign\` foreign key (\`user_id_usuario\`) references \`user\` (\`id_usuario\`) on update cascade;`);

    this.addSql(`alter table \`donaciones\` modify \`donante_id_usuario\` varchar(255) not null;`);
    this.addSql(`alter table \`donaciones\` add constraint \`donaciones_donante_id_usuario_foreign\` foreign key (\`donante_id_usuario\`) references \`user\` (\`id_usuario\`) on update cascade;`);
  }

}
