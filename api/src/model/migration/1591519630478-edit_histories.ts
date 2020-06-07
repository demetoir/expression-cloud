import {MigrationInterface, QueryRunner} from "typeorm";

export class editHistories1591519630478 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`



            CREATE TABLE \`edit_histories\`
            (
                id         bigint primary key NOT NULL auto_increment,
                \`prev_id\`    bigint             NULL,
                \`user_id\`    bigint             NULL,
                \`ref_id\`     bigint             NULL,
                \`ref_type\`   bigint             NULL,
                \`edit_type\`  bigint             NULL,
                \`created_at\` DATETIME           NOT NULL default now(),
                \`updated_at\` DATETIME           NOT NULL default now(),
                \`deleted_at\` DATETIME           NULL
            );
`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('edit_histories')
    }

}
