import { MigrationInterface, QueryRunner } from 'typeorm';

export class add_user_likes_table_1591520000000 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            CREATE TABLE \`user_likes\`
            (
                id             bigint primary key NOT NULL auto_increment,
                \`user_id\`    bigint             NULL,
                \`like_id\`    bigint             NULL,
                \`created_at\` DATETIME           NOT NULL default now(),
                \`updated_at\` DATETIME           NOT NULL default now(),
                \`deleted_at\` DATETIME           NULL
            );
        `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('user_likes');
	}
}
