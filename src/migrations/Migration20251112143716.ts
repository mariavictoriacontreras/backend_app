import { Migration } from '@mikro-orm/migrations';

export class Migration20251112143716 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`pet\` add \`image_url\` varchar(255) null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`pet\` drop column \`image_url\`;`);
  }

}
