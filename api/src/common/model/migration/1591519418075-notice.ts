import { MigrationInterface, QueryRunner } from 'typeorm';

export class notice1591519418075 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            CREATE TABLE \`notice\`
            (
                id             bigint primary key NOT NULL auto_increment,
                \`user_id\`    bigint             NULL,
                \`content\`    text               NOT NULL,
                \`is_read\`    tinyint(1)         NOT NULL DEFAULT false,
                \`created_at\` DATETIME           NOT NULL default now(),
                \`updated_at\` DATETIME           NOT NULL default now(),
                \`deleted_at\` DATETIME           NULL
            );
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('notice');
	}
}
