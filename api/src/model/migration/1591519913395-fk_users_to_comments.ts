import { MigrationInterface, QueryRunner } from 'typeorm';

export class fkUsersToComments1591519913395 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
        
        

ALTER TABLE \`comments\`
    ADD CONSTRAINT \`fk_users_to_comments\` FOREIGN KEY (\`user_id\`) REFERENCES
        \`users\` (id);
        `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('');
	}
}
