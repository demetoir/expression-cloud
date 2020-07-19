import { MigrationInterface, QueryRunner } from 'typeorm';

export class add_fk_constraint_expressions_to_tag_in_tag_tables_1591519986000
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE \`tags\`
                ADD CONSTRAINT \`fk_expressions_to_tags\` FOREIGN KEY (\`expression_id\`) REFERENCES
                    \`expressions\` (id);
        `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE \`tags\`
                drop constraint \`fk_expressions_to_tags\`
        `);
	}
}
