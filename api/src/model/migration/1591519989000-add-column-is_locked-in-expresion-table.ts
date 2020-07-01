import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class add_is_locked_column_in_expressions_table_1591519989000
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'expressions',
			new TableColumn({
				name: 'is_locked',
				type: 'boolean',
				isNullable: false,
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn(
			'expressions',
			new TableColumn({
				name: 'is_locked',
				type: 'boolean',
				isNullable: false,
			}),
		);
	}
}
