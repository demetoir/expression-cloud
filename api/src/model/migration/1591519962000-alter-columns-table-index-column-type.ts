import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class alterColumnsTableIndexColumnType1591519961073
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.changeColumn(
			'columns',

			new TableColumn({
				name: 'index',
				type: 'bigint',
				isNullable: false,
			}),
			new TableColumn({ name: 'index', type: 'int', isNullable: false }),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.changeColumn(
			'columns',

			new TableColumn({ name: 'index', type: 'int', isNullable: false }),
			new TableColumn({
				name: 'index',
				type: 'bigint',
				isNullable: false,
			}),
		);
	}
}
