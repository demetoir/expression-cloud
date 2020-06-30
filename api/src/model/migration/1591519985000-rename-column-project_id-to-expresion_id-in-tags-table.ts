import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class rename_column_project_id_to_expression_id_in_tags_table_1591519985000
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.renameColumn(
			'tags',
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
		await queryRunner.renameColumn(
			'tags',
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
