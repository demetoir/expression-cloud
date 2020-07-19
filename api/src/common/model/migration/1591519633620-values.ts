import { MigrationInterface, QueryRunner } from 'typeorm';

export class values1591519633620 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            CREATE TABLE \`values\`
            (
                id             bigint primary key NOT NULL auto_increment,
                \`column_id\`  bigint             NULL,
                \`value\`      bigint             NOT NULL,
                \`index\`      bigint             NOT NULL,
                \`created_at\` DATETIME           NOT NULL default now(),
                \`updated_at\` DATETIME           NOT NULL default now(),
                \`deleted_at\` DATETIME           NULL
            );
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('values');
	}
}
