import { Migration } from '@mikro-orm/migrations';

export class Migration20251008135647_addPasswordToUser extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`user\` add \`password\` varchar(255) not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`user\` drop column \`password\`;`);
  }

}
