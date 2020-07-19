import { MigrationInterface, QueryRunner } from 'typeorm';

export class drop_projects_tables_1591519977000 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('projects');
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            CREATE TABLE \`projects\`
            (
                id              bigint primary key NOT NULL auto_increment,
                \`user_id\`     bigint             NULL,
                \`name\`        VARCHAR(255)       NOT NULL,
                \`is_public\`   tinyint(1)         NOT NULL DEFAULT false,
                \`is_locked\`   tinyint(1)         NOT NULL DEFAULT false,
                \`description\` text               NOT NULL,
                \`created_at\`  DATETIME           NOT NULL default now(),
                \`updated_at\`  DATETIME           NOT NULL default now(),
                \`deleted_at\`  DATETIME           NULL
            );
        `);
	}
}
