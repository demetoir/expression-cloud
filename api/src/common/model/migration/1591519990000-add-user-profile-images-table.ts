import { MigrationInterface, QueryRunner } from 'typeorm';

export class add_is_locked_column_in_expressions_table_1591519990000
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            CREATE TABLE \`user_profile_images\`
            (
                id             bigint primary key NOT NULL auto_increment,
                \`user_id\`    bigint             NULL,
                \`image_id\`   bigint             NULL,
                \`created_at\` DATETIME           NOT NULL default now(),
                \`updated_at\` DATETIME           NOT NULL default now(),
                \`deleted_at\` DATETIME           NULL
            );
        `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('user_profile_images');
	}
}
