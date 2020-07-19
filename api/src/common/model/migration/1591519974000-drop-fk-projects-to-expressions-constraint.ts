import { MigrationInterface, QueryRunner } from 'typeorm';

export class drop_fk_constraint_projects_to_expressions_1591519974000
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            alter table \`expressions\`
                drop constraint \`fk_projects_to_expressions\`
        `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE \`expressions\`
                ADD CONSTRAINT \`fk_projects_to_expressions\` FOREIGN KEY (\`project_id\`)
                    REFERENCES \`projects\` (id);
        `);
	}
}
