import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class drop_column_ref_type_in_likes_table_1591519993000
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn(
			'likes',
			new TableColumn({
				name: 'ref_type',
				type: 'bigint',
				isNullable: true,
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'likes',
			new TableColumn({
				name: 'ref_type',
				type: 'bigint',
				isNullable: true,
			}),
		);
	}
}
