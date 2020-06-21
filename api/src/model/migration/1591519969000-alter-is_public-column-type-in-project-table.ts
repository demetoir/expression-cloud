import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class alterColumnsTableIndexColumnType1591519969000
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.changeColumn(
			'projects',
			new TableColumn({
				name: 'is_public',
				type: 'tinyint',
				isNullable: false,
			}),
			new TableColumn({
				name: 'is_public',
				type: 'boolean',
				isNullable: false,
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.changeColumn(
			'projects',
			new TableColumn({
				name: 'is_public',
				type: 'boolean',
				isNullable: false,
			}),
			new TableColumn({
				name: 'is_public',
				type: 'tinyint',
				isNullable: false,
			}),
		);
	}
}
