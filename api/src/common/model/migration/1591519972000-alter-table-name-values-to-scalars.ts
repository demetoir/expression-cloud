import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterTableNameValuesToScalars1591519972000
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE \`values\` RENAME TO \`scalars\`
        `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE \`scalars\` RENAME TO \`values\`
        `);
	}
}
