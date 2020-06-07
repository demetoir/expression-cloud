import { MigrationInterface, QueryRunner } from 'typeorm';

export class images1591519624801 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`            CREATE TABLE \`images\`
            (
                id         bigint primary key NOT NULL auto_increment,
                \`url\`        text               NOT NULL,
                \`extension\`  VARCHAR(255)       NOT NULL,
                \`file_name\`  text               NOT NULL,
                \`ret_type\`   bigint             NULL,
                \`ref_id\`     bigint             NULL,
                \`created_at\` DATETIME           NOT NULL default now(),
                \`updated_at\` DATETIME           NOT NULL default now(),
                \`deleted_at\` DATETIME           NULL
            );
`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('images');
	}
}
