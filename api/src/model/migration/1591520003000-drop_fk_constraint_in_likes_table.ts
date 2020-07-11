import { MigrationInterface, QueryRunner } from 'typeorm';

export class drop_fk_constraint_in_likes_table_1591520003000
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            alter table \`likes\`
                drop constraint \`fk_users_to_likes\`
        `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE \`likes\`
                ADD CONSTRAINT \`fk_users_to_likes\` FOREIGN KEY (\`user_id\`) REFERENCES
                    \`users\` (id);
        `);
	}
}
