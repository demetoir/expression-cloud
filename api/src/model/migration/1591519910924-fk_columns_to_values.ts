import { MigrationInterface, QueryRunner } from 'typeorm';

export class fkColumnsToValues1591519910924 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE \`values\`
                ADD CONSTRAINT \`fk_columns_to_values\` FOREIGN KEY (\`column_id\`) REFERENCES
                    \`columns\` (id);
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('');
	}
}
