import { MigrationInterface, QueryRunner } from 'typeorm';

export class add_fk_constraint_users_to_expressions_1591519984000
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE \`expressions\`
                ADD CONSTRAINT \`fk_users_to_expressions\` FOREIGN KEY (\`user_id\`) REFERENCES
                    \`users\` (id);
        `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		// add  expresion - user fk constraint
		await queryRunner.query(`
            ALTER TABLE \`expressions\`
                drop constraint \`fk_users_to_expressions\`
        `);
	}
}
