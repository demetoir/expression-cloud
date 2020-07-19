import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class rename_column_project_id_to_expression_id_in_expression_settings_table_1591519982000
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		// rename column project_id to expression_id in tags table
		await queryRunner.renameColumn(
			'expression_settings',
			new TableColumn({
				name: 'project_id',
				type: 'bigint',
				isNullable: true,
			}),
			new TableColumn({
				name: 'expression_id',
				type: 'bigint',
				isNullable: true,
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		// rename column project_id to expression_id in tags table
		await queryRunner.renameColumn(
			'expression_settings',
			new TableColumn({
				name: 'expression_id',
				type: 'bigint',
				isNullable: true,
			}),
			new TableColumn({
				name: 'project_id',
				type: 'bigint',
				isNullable: true,
			}),
		);
	}
}
