import {MigrationInterface, QueryRunner} from "typeorm";

export class expressions1591519627031 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`



            CREATE TABLE \`expressions\`
            (
                id         bigint primary key NOT NULL auto_increment,
                \`project_id\` bigint             NULL,
                \`type\`       TINYINT(1)         NOT NULL,
                \`name\`       VARCHAR(255)       NOT NULL,
                \`content\`    text               NOT NULL,
                \`created_at\` DATETIME           NOT NULL default now(),
                \`updated_at\` DATETIME           NOT NULL default now(),
                \`deleted_at\` DATETIME           NULL
            );
`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('expressions')
    }

}
