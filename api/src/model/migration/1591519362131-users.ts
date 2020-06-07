import { MigrationInterface, QueryRunner } from 'typeorm';

export class users1591519362131 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`            
            CREATE TABLE \`users\`
            (
                id          bigint primary key NOT NULL auto_increment,
                \`name\`        VARCHAR(255)       NOT NULL,
                \`email\`       text               NOT NULL,
                \`description\` text               NOT NULL,
                \`created_at\`  DATETIME           NOT NULL default now(),
                \`updated_at\`  DATETIME           NOT NULL default now(),
                \`deleted_at\`  DATETIME           NULL
            );`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('users');
	}
}
