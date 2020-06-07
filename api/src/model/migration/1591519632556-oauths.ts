import {MigrationInterface, QueryRunner} from "typeorm";

export class oauths1591519632556 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`

            CREATE TABLE \`oauths\`
            (
                id         bigint primary key NOT NULL auto_increment,
                \`user_id\`    bigint             NULL,
                \`type\`       TINYINT(1)         NOT NULL,
                \`auth_id\`    VARCHAR(255)       NOT NULL,
                \`created_at\` DATETIME           NOT NULL default now(),
                \`updated_at\` DATETIME           NOT NULL default now(),
                \`deleted_at\` DATETIME           NULL
            );
`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('oauths')
    }

}
