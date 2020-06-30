import { MigrationInterface, QueryRunner } from 'typeorm';

export class rename_table_project_settings_to_expression_settings_1591519981000
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.renameTable(
			'project_settings',
			'expression_settings',
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.renameTable(
			'expression_settings',
			'project_settings',
		);
	}
}
