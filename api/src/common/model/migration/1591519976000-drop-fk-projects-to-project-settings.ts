import { MigrationInterface, QueryRunner } from 'typeorm';

export class drop_fk_constraint_projects_to_project_settings_1591519976000
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            alter table \`project_settings\`
                drop constraint \`fk_projects_to_project_settings\`
        `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE \`project_settings\`
                ADD CONSTRAINT \`fk_projects_to_project_settings\` FOREIGN KEY (\`project_id\`)
                    REFERENCES \`projects\` (id);
        `);
	}
}
