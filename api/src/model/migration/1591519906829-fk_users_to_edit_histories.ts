import { MigrationInterface, QueryRunner } from 'typeorm';

export class fkUsersToEditHistories1591519906829 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE \`edit_histories\`
                ADD CONSTRAINT \`fk_users_to_edit_histories\` FOREIGN KEY (\`user_id\`)
                    REFERENCES \`users\` (id);
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('');
	}
}
