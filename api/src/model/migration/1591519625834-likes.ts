import { MigrationInterface, QueryRunner } from 'typeorm';

export class likes1591519625834 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`


            CREATE TABLE \`likes\`
            (
                id         bigint primary key NOT NULL auto_increment,
                \`user_id\`    bigint             NULL,
                \`ref_type\`   bigint             NOT NULL,
                \`ref_id\`     bigint             NULL,
                \`created_at\` DATETIME           NOT NULL default now(),
                \`updated_at\` DATETIME           NOT NULL default now(),
                \`deleted_at\` DATETIME           NULL
            );`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable(`likes`);
	}
}
