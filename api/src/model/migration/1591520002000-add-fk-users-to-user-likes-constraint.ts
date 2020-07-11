import { MigrationInterface, QueryRunner } from 'typeorm';

export class add_fk_users_to_user_likes_constraint_1591520001000
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE \`user_likes\`
                ADD CONSTRAINT \`fk_users_to_user_likes\` FOREIGN KEY (\`user_id\`)
                    REFERENCES \`users\` (id);
        `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE \`user_likes\`
                drop constraint \`fk_users_to_user_likes\`
        `);
	}
}
