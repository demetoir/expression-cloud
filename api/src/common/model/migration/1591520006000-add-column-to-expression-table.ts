import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class add_column_to_expression_table_1591520006000
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'expressions',
			new TableColumn({
				name: 'like_count',
				type: 'integer',
				isNullable: false,
			}),
		);

		await queryRunner.addColumn(
			'expressions',
			new TableColumn({
				name: 'is_forked',
				type: 'boolean',
				isNullable: false,
			}),
		);

		await queryRunner.addColumn(
			'expressions',
			new TableColumn({
				name: 'fork_count',
				type: 'integer',
				isNullable: false,
			}),
		);

		await queryRunner.addColumn(
			'expressions',
			new TableColumn({
				name: 'origin_id',
				type: 'bigint',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn(
			'expressions',
			new TableColumn({
				name: 'origin_id',
				type: 'bigint',
			}),
		);

		await queryRunner.dropColumn(
			'expressions',
			new TableColumn({
				name: 'fork_count',
				type: 'integer',
				isNullable: false,
			}),
		);

		await queryRunner.dropColumn(
			'expressions',
			new TableColumn({
				name: 'is_forked',
				type: 'boolean',
				isNullable: false,
			}),
		);

		await queryRunner.addColumn(
			'expressions',
			new TableColumn({
				name: 'like_count',
				type: 'integer',
				isNullable: false,
			}),
		);
	}
}
