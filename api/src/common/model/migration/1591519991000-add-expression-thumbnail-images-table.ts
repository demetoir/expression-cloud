import { MigrationInterface, QueryRunner } from 'typeorm';

export class add_expression_thumbnail_images_1591519991000
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            CREATE TABLE \`expresion_thumbnail_images\`
            (
                id                bigint primary key NOT NULL auto_increment,
                \`expression_id\` bigint             NULL,
                \`image_id\`      bigint             NULL,
                \`created_at\`    DATETIME           NOT NULL default now(),
                \`updated_at\`    DATETIME           NOT NULL default now(),
                \`deleted_at\`    DATETIME           NULL
            );
        `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('expresion_thumbnail_images');
	}
}
