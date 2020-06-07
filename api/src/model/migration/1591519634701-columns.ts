import { MigrationInterface, QueryRunner } from 'typeorm';

export class columns1591519634701 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`

            CREATE TABLE \`columns\`
            (
                id            bigint primary key NOT NULL auto_increment,
                \`expression_id\` bigint             NULL,
                \`name\`          VARCHAR(255)       NOT NULL,
                \`index\`         bigint             NOT NULL,
                \`created_at\`    DATETIME           NOT NULL default now(),
                \`updated_at\`    DATETIME           NOT NULL default now(),
                \`deleted_at\`    DATETIME           NULL
            );`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('columns');
	}
}
