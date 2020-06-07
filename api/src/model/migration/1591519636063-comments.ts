import {MigrationInterface, QueryRunner} from "typeorm";

export class comments1591519636063 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`




            CREATE TABLE \`comments\`
            (
                id         bigint primary key NOT NULL auto_increment,
                \`user_id\`    bigint             NULL,
                \`content\`    text               NOT NULL,
                \`ref_type\`   bigint             NULL,
                \`ref_id\`     bigint             NULL,
                \`created_at\` DATETIME           NOT NULL default now(),
                \`updated_at\` DATETIME           NOT NULL default now(),
                \`deleted_at\` DATETIME           NULL
            );
`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable('comments')
    }

}
