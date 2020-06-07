import { MigrationInterface, QueryRunner } from 'typeorm';

export class fkUsersToUserSettings1591519899417 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
ALTER TABLE \`user_settings\`
    ADD CONSTRAINT \`fk_users_to_user_settings\` FOREIGN KEY (\`user_id\`)
        REFERENCES \`users\` (id);
`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('');
	}
}
