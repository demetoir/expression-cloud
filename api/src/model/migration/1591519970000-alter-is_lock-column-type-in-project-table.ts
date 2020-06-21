import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class alterColumnsTableIndexColumnType1591519970000
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.changeColumn(
			'projects',
			new TableColumn({
				name: 'is_locked',
				type: 'tinyint',
				isNullable: false,
			}),
			new TableColumn({
				name: 'is_locked',
				type: 'boolean',
				isNullable: false,
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.changeColumn(
			'projects',
			new TableColumn({
				name: 'is_locked',
				type: 'boolean',
				isNullable: false,
			}),
			new TableColumn({
				name: 'is_locked',
				type: 'tinyint',
				isNullable: false,
			}),
		);
	}
}
