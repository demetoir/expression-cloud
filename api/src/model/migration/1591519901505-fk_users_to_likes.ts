import { MigrationInterface, QueryRunner } from 'typeorm';

export class fkUsersToLikes1591519901505 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
        
ALTER TABLE \`likes\`
    ADD CONSTRAINT \`fk_users_to_likes\` FOREIGN KEY (\`user_id\`) REFERENCES
        \`users\` (id);

        
        `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('');
	}
}
