import { MigrationInterface, QueryRunner } from 'typeorm';

export class fkUsersToUserTeam1591519904716 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE \`user_team\`
                ADD CONSTRAINT \`fk_users_to_user_team\` FOREIGN KEY (\`user_id\`) REFERENCES
                    \`users\` (id);
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
	        alter table \`user_team\`  
	            drop constraint \`fk_users_to_user_team\`   
	`);
	}
}
