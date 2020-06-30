import { MigrationInterface, QueryRunner } from 'typeorm';

export class fkEditHistoriesToEditHistoryValueBigints1591519961073
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE \`edit_history_value_bigints\`
                ADD CONSTRAINT \`fk_edit_histories_to_edit_history_value_bigints\` FOREIGN KEY
                    (edit_history_id) REFERENCES \`edit_histories\` (id);
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
	        alter table \`edit_history_value_bigints\`  
	            drop constraint \`fk_edit_histories_to_edit_history_value_bigints\`   
	`);
	}
}
