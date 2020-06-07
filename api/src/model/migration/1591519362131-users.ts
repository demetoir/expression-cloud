import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class users1591519362131 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'users',
				columns: [
					{
						name: 'id',
						type: 'bigint',
						width: 20,
						generationStrategy: 'increment',
						isPrimary: true,
						isNullable: false,
					},
					{
						name: 'name',
						type: 'varchar',
						width: 255,
						isNullable: false,
					},
					{ name: 'email', type: 'text', isNullable: false },
					{ name: 'description', type: 'text', isNullable: false },
					{ name: 'created_at', type: 'datetime', isNullable: false },
					{ name: 'updated_at', type: 'datetime', isNullable: false },
					{ name: 'deleted_at', type: 'datetime', isNullable: true },
				],
			}),
			true,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('users');
	}
}
