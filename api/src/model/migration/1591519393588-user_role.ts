import { MigrationInterface, QueryRunner } from 'typeorm';

export class userRole1591519393588 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            CREATE TABLE \`user_role\`
            (
                id         bigint primary key NOT NULL auto_increment,
                \`user_id\`    bigint             NULL,
                \`role_id\`    bigint             NULL,
                \`created_at\` DATETIME           NOT NULL default now(),
                \`updated_at\` DATETIME           NOT NULL default now(),
                \`deleted_at\` DATETIME           NULL

            );
`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('user_role');
	}
}
