import { MigrationInterface, QueryRunner } from 'typeorm';

export class fkUsersToOauths1591519909892 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE \`oauths\`
                ADD CONSTRAINT \`fk_users_to_oauths\` FOREIGN KEY (\`user_id\`) REFERENCES
                    \`users\` (id);
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('');
	}
}
