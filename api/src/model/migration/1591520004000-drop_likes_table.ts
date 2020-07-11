import { MigrationInterface, QueryRunner } from 'typeorm';

export class drop_likes_table_1591520004000 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('likes');
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            create table likes
            (
                id         bigint auto_increment
                    primary key,
                user_id    bigint                             null,
                created_at datetime default CURRENT_TIMESTAMP not null,
                updated_at datetime default CURRENT_TIMESTAMP not null,
                deleted_at datetime                           null,
            );
        `);
	}
}
