import { MigrationInterface, QueryRunner } from 'typeorm';

export class add_fk_images_to_expression_thumbnail_images_constraint_1591519997000
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE \`expresion_thumbnail_images\`
                ADD CONSTRAINT \`fk_images_to_expression_thumbnail_images\` FOREIGN KEY (\`image_id\`)
                    REFERENCES \`images\` (id);
        `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE \`expresion_thumbnail_images\`
                drop constraint \`fk_images_to_expression_thumbnail_images\`
        `);
	}
}
