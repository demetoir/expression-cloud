import { MigrationInterface, QueryRunner } from 'typeorm';

export class userTeam1591519629447 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`

            CREATE TABLE \`user_team\`
            (
                id         bigint primary key NOT NULL auto_increment,
                \`user_id\`    bigint             NULL,
                \`team_id\`    bigint             NULL,
                \`created_at\` DATETIME           NOT NULL default now(),
                \`updated_at\` DATETIME           NOT NULL default now(),
                \`deleted_at\` DATETIME           NULL
            );`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('user_team');
	}
}
