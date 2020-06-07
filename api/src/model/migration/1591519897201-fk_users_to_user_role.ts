import { MigrationInterface, QueryRunner } from 'typeorm';

export class fkUsersToUserRole1591519897201 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE \`user_role\`
    ADD CONSTRAINT \`fk_users_to_user_role\` FOREIGN KEY (\`user_id\`) REFERENCES
        \`users\` (id);
`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
ALTER TABLE \`user_role\`
    drop CONSTRAINT \`fk_users_to_user_role\` ;
`);
	}
}
