import { MigrationInterface, QueryRunner } from 'typeorm';

export class add_fk_expression_to_expression_thumbnail_images_constraint_1591519996000
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE \`expresion_thumbnail_images\`
                ADD CONSTRAINT \`fk_expressions_to_expression_thumbnail_images\` FOREIGN KEY (\`expression_id\`)
                    REFERENCES \`expressions\` (id);
        `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE \`expresion_thumbnail_images\`
                drop constraint \`fk_expressions_to_expression_thumbnail_images\`
        `);
	}
}
