import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class drop_column_ref_id_in_likes_table_1591519992000
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn(
			'likes',
			new TableColumn({
				name: 'ref_id',
				type: 'bigint',
				isNullable: true,
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'likes',
			new TableColumn({
				name: 'ref_id',
				type: 'bigint',
				isNullable: true,
			}),
		);
	}
}
