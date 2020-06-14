import { MigrationInterface, QueryRunner } from 'typeorm';

export class fkExpressionsToColumns1591519911960 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE \`columns\`
                ADD CONSTRAINT \`fk_expressions_to_columns\` FOREIGN KEY (\`expression_id\`)
                    REFERENCES \`expressions\` (id);
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('');
	}
}
