import { MigrationInterface, QueryRunner } from 'typeorm';

export class teams1591519623783 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            CREATE TABLE \`teams\`
            (
                id          bigint primary key NOT NULL auto_increment,
                \`name\`        VARCHAR(255)       NOT NULL,
                \`description\` text               NOT NULL,
                \`created_at\`  DATETIME           NOT NULL default now(),
                \`updated_at\`  DATETIME           NOT NULL default now(),
                \`deleted_at\`  DATETIME           NULL
            );`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('teams');
	}
}
