import { MigrationInterface, QueryRunner } from 'typeorm';

export class create_expressions_table_1591519980000
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            CREATE TABLE \`expressions\`
            (
                id              bigint primary key NOT NULL auto_increment,
                \`type\`        TINYINT(1)         NOT NULL,
                \`name\`        VARCHAR(255)       NOT NULL,
                \`content\`     text               NOT NULL,
                \`user_id\`     bigint             NULL,
                \`description\` text               NOT NULL,
                \`created_at\`  DATETIME           NOT NULL default now(),
                \`updated_at\`  DATETIME           NOT NULL default now(),
                \`deleted_at\`  DATETIME           NULL
            );
        `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('expressions');
	}
}
