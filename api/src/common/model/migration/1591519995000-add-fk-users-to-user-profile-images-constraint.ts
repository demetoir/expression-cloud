import { MigrationInterface, QueryRunner } from 'typeorm';

export class add_fk_user_to_user_profile_images_constraint_1591519995000
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE \`user_profile_images\`
                ADD CONSTRAINT \`fk_users_to_user_profile_images\` FOREIGN KEY (\`user_id\`)
                    REFERENCES \`users\` (id);
        `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE \`user_profile_images\`
                drop constraint \`fk_users_to_user_profile_images\`
        `);
	}
}
