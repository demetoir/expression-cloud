import { MigrationInterface, QueryRunner } from 'typeorm';

export class tags1591519628231 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            CREATE TABLE \`tags\`
            (
                id             bigint primary key NOT NULL auto_increment,
                \`project_id\` bigint             NULL,
                \`name\`       VARCHAR(255)       NOT NULL,
                \`created_at\` DATETIME           NOT NULL default now(),
                \`updated_at\` DATETIME           NOT NULL default now(),
                \`deleted_at\` DATETIME           NULL
            );
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('tags');
	}
}
