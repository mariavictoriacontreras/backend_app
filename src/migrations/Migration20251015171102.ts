import { Migration } from '@mikro-orm/migrations';

export class Migration20251015171102 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`user\` add \`tipo_documento\` varchar(255) not null, add \`nro_documento\` varchar(255) not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`user\` drop column \`tipo_documento\`, drop column \`nro_documento\`;`);
  }

}
