import { MigrationInterface, QueryRunner } from 'typeorm';

export class drop_fk_constraint_tag_to_project_1591519975000
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            alter table \`tags\`
                drop constraint \`fk_projects_to_tags\`
        `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE \`tags\`
                ADD CONSTRAINT \`fk_projects_to_tags\` FOREIGN KEY (\`project_id\`) REFERENCES
                    \`projects\` (id);
        `);
	}
}
