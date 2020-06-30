import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterTableNameColumnToVector1591519971000
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
        	ALTER TABLE \`columns\` RENAME TO \`vectors\`
        `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
        	ALTER TABLE \`vectors\` RENAME TO \`columns\`
        `);
	}
}
