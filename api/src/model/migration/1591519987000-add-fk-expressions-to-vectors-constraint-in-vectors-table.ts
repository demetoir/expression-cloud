import { MigrationInterface, QueryRunner } from 'typeorm';

export class add_fk_constraint_expressions_to_vectors_in_vectors_table_1591519987000
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE \`vectors\`
                ADD CONSTRAINT \`fk_expressions_to_vectors\` FOREIGN KEY (\`expression_id\`) REFERENCES
                    \`expressions\` (id);
        `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE \`vectors\`
                drop constraint \`fk_expressions_to_vectors\`
        `);
	}
}
