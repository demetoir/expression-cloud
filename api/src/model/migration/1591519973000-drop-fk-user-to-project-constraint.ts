import { MigrationInterface, QueryRunner } from 'typeorm';

export class drop_fk_constraint_user_to_project_1591519973000
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            alter table \`projects\`
                drop constraint \`fk_users_to_projects\`
        `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE \`projects\`
                ADD CONSTRAINT \`fk_users_to_projects\` FOREIGN KEY (\`user_id\`) REFERENCES
                    \`users\` (id);`);
	}
}
