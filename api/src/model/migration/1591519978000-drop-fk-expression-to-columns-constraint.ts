import { MigrationInterface, QueryRunner } from 'typeorm';

export class drop_fk_constraint_expresion_to_column_1591519978000
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            alter table \`vectors\`
                drop constraint \`fk_expressions_to_columns\`
        `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE \`vectors\`
                ADD CONSTRAINT \`fk_expressions_to_columns\` FOREIGN KEY (\`expression_id\`)
                    REFERENCES \`expressions\` (id);
        `);
	}
}
