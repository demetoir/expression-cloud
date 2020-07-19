import { MigrationInterface, QueryRunner } from 'typeorm';

export class add_expression_likes_table_1591520005000
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            CREATE TABLE \`expression_likes\`
            (
                id               bigint primary key NOT NULL auto_increment,
                \`from_user_id\`   bigint             NULL,
                \`to_expression_id\` bigint             NULL,
                \`created_at\`   DATETIME           NOT NULL default now(),
                \`updated_at\`   DATETIME           NOT NULL default now(),
                \`deleted_at\`   DATETIME           NULL
            );
        `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('expression_likes');
	}
}
