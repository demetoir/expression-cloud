import { MigrationInterface, QueryRunner } from 'typeorm';

export class drop_expression_table_1591519979000 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		// drop expression table
		await queryRunner.dropTable('expressions');
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            create table expressions
            (
                id          bigint auto_increment primary key,
                project_id  bigint                             null,
                type        tinyint(1)                         not null,
                name        varchar(255)                       not null,
                description text                               not null,
                created_at  datetime default CURRENT_TIMESTAMP not null,
                updated_at  datetime default CURRENT_TIMESTAMP not null,
                deleted_at  datetime                           null
            );
        `);
	}
}
