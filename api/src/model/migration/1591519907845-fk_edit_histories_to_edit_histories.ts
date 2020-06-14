import { MigrationInterface, QueryRunner } from 'typeorm';

export class fkEditHistoriesToEditHistories1591519907845
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE \`edit_histories\`
                ADD CONSTRAINT \`fk_edit_histories_to_edit_histories\` FOREIGN KEY (\`prev_id\`)
                    REFERENCES \`edit_histories\` (id);
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('');
	}
}
