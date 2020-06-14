import { MigrationInterface, QueryRunner } from 'typeorm';

export class fkUsersToNotice1591519900458 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE \`notice\`
                ADD CONSTRAINT \`fk_users_to_notice\` FOREIGN KEY (\`user_id\`) REFERENCES
                    \`users\` (id);
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('');
	}
}
