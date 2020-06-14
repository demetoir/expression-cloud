import { MigrationInterface, QueryRunner } from 'typeorm';

export class fkProjectsToExpressions1591519902554
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE \`expressions\`
                ADD CONSTRAINT \`fk_projects_to_expressions\` FOREIGN KEY (\`project_id\`)
                    REFERENCES \`projects\` (id);
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('');
	}
}
