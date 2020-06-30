import { MigrationInterface, QueryRunner } from 'typeorm';

export class fkEditHistoriesToEditHistoryValueVarchars1591519915510
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE \`edit_history_value_varchars\`
                ADD CONSTRAINT \`fk_edit_histories_to_edit_history_value_varchars\` FOREIGN KEY
                    (\`edit_history_id\`) REFERENCES \`edit_histories\` (id);
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
	        alter table \`edit_history_value_varchars\`  
	            drop constraint \`fk_edit_histories_to_edit_history_value_varchars\`   
	`);
	}
}
