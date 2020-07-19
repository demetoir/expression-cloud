import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class alterColumnsTableIndexColumnType1591519968000
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.changeColumn(
			'notice',
			new TableColumn({
				name: 'is_read',
				type: 'tinyint',
				isNullable: false,
			}),
			new TableColumn({
				name: 'is_read',
				type: 'boolean',
				isNullable: false,
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.changeColumn(
			'notice',
			new TableColumn({
				name: 'is_read',
				type: 'boolean',
				isNullable: false,
			}),
			new TableColumn({
				name: 'is_read',
				type: 'tinyint',
				isNullable: false,
			}),
		);
	}
}
