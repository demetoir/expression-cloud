import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class alterColumnsTableIndexColumnType1591519964000
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.changeColumn(
			'values',
			new TableColumn({
				name: 'value',
				type: 'bigint',
				isNullable: false,
			}),
			new TableColumn({
				name: 'value',
				type: 'double precision',
				isNullable: false,
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.changeColumn(
			'values',
			new TableColumn({
				name: 'value',
				type: 'double precision',
				isNullable: false,
			}),
			new TableColumn({
				name: 'value',
				type: 'bigint',
				isNullable: false,
			}),
		);
	}
}
