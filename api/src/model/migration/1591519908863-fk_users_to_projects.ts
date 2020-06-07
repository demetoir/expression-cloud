import { MigrationInterface, QueryRunner } from 'typeorm';

export class fkUsersToProjects1591519908863 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
        
ALTER TABLE \`projects\`
    ADD CONSTRAINT \`fk_users_to_projects\` FOREIGN KEY (\`user_id\`) REFERENCES
        \`users\` (id);
        
        `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('');
	}
}
