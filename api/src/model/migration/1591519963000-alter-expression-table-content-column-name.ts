import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class alterColumnsTableIndexColumnType1591519961073
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.changeColumn(
			'expressions',
			new TableColumn({
				name: 'content',
				type: 'text',
				isNullable: false,
			}),
			new TableColumn({
				name: 'description',
				type: 'text',
				isNullable: false,
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.changeColumn(
			'expressions',
			new TableColumn({
				name: 'description',
				type: 'text',
				isNullable: false,
			}),
			new TableColumn({
				name: 'content',
				type: 'text',
				isNullable: false,
			}),
		);
	}
}
