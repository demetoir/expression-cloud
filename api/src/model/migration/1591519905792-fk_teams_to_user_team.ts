import { MigrationInterface, QueryRunner } from 'typeorm';

export class fkTeamsToUserTeam1591519905792 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE \`user_team\`
                ADD CONSTRAINT \`fk_teams_to_user_team\` FOREIGN KEY (\`team_id\`) REFERENCES
                    \`teams\` (id);
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('');
	}
}
