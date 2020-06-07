import { MigrationInterface, QueryRunner } from 'typeorm';

export class projectSettings1591519637117 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            CREATE TABLE \`project_settings\`
            (
                id         bigint primary key NOT NULL auto_increment,
                \`project_id\` bigint             NULL,
                \`created_at\` DATETIME           NOT NULL default now(),
                \`updated_at\` DATETIME           NOT NULL default now(),
                \`deleted_at\` DATETIME           NULL
            );

`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('project_settings');
	}
}
