import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class add_column_to_user_table_1591520006000
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'users',
			new TableColumn({
				name: 'is_anonymous',
				type: 'boolean',
				isNullable: false,
				default: false,
			}),
		);

		await queryRunner.addColumn(
			'users',
			new TableColumn({
				name: 'liked_count',
				type: 'integer',
				isNullable: false,
				default: 0,
			}),
		);

		await queryRunner.addColumn(
			'users',
			new TableColumn({
				name: 'forked_count',
				type: 'integer',
				isNullable: false,
				default: 0,
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn(
			'users',
			new TableColumn({
				name: 'is_anonymous',
				type: 'boolean',
				isNullable: false,
				default: false,
			}),
		);

		await queryRunner.dropColumn(
			'users',
			new TableColumn({
				name: 'liked_count',
				type: 'integer',
				isNullable: false,
				default: 0,
			}),
		);

		await queryRunner.dropColumn(
			'users',
			new TableColumn({
				name: 'forked_count',
				type: 'integer',
				isNullable: false,
				default: 0,
			}),
		);
	}
}
