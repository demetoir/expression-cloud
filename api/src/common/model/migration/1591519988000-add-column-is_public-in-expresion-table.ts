import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class add_is_public_column_in_expressions_table_1591519988000
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'expressions',
			new TableColumn({
				name: 'is_public',
				type: 'boolean',
				isNullable: false,
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn(
			'expressions',
			new TableColumn({
				name: 'is_public',
				type: 'boolean',
				isNullable: false,
			}),
		);
	}
}
