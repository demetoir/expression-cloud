import { MigrationInterface, QueryRunner } from 'typeorm';

export class fkProjectsToTags1591519903586 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE \`tags\`
                ADD CONSTRAINT \`fk_projects_to_tags\` FOREIGN KEY (\`project_id\`) REFERENCES
                    \`projects\` (id);
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
	        alter table \`tags\`  
	            drop constraint \`fk_projects_to_tags\`   
	`);
	}
}
