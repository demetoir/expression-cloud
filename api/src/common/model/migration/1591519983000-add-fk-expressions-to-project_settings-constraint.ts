import { MigrationInterface, QueryRunner } from 'typeorm';

export class add_fk_constraint_expressions_to_project_settings_1591519983000
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE \`expression_settings\`
                ADD CONSTRAINT \`fk_expressions_to_project_settings\` FOREIGN KEY (\`expression_id\`)
                    REFERENCES \`expressions\` (id);
        `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE \`expression_settings\`
                drop constraint \`fk_expressions_to_project_settings\`
        `);
	}
}
