import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class alterColumnsTableIndexColumnType1591519966000
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'images',
			new TableColumn({
				name: 'path',
				type: 'text',
				isNullable: false,
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn(
			'images',
			new TableColumn({
				name: 'path',
				type: 'text',
				isNullable: false,
			}),
		);
	}
}
