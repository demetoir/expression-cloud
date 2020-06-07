import { MigrationInterface, QueryRunner } from 'typeorm';

export class editHistoryValueVarchars1591519638403
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            CREATE TABLE \`edit_history_value_varchars\`
            (
                id              bigint primary key NOT NULL auto_increment,
                \`edit_history_id\` bigint             NULL,
                \`value\`           VARCHAR(255)       NOT NULL,
                \`created_at\`      DATETIME           NOT NULL default now(),
                \`updated_at\`      DATETIME           NOT NULL default now(),
                \`deleted_at\`      DATETIME           NULL
            );
`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('edit_history_value_varchars');
	}
}
