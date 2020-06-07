import { MigrationInterface, QueryRunner } from 'typeorm';

export class fkRolesToUserRole1591519898381 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
ALTER TABLE \`user_role\`
    ADD CONSTRAINT \`fk_roles_to_user_role\` FOREIGN KEY (\`role_id\`) REFERENCES
        \`roles\` (id);`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('');
	}
}
