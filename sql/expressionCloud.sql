-- TODO
--    마이그레이션은 typeorm 을에서 보기
--    SQL 파일 읽어서 수행하는 식으로 만들기
--    만들때 따로 따로 한테이블 씩 노가다해서 만들기
DROP TABLE IF EXISTS `users`;

CREATE TABLE `users`
(
    `id`          BIGINT(20)   NOT NULL auto_increment primary key ,
    `name`        VARCHAR(255) NOT NULL,
    `email`       VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `created_at`  DATETIME     NOT NULL default now(),
    `updated_at`  DATETIME     NOT NULL default now(),
    `deleted_at`  DATETIME     NULL
);

DROP TABLE IF EXISTS `user_role`;

CREATE TABLE `user_role`
(
    `id`          BIGINT(20)   NOT NULL auto_increment primary key ,
    `user_id`    BIGINT(20) NOT NULL,
    `role_id`    BIGINT(20) NOT NULL,
    `created_at` DATETIME   NOT NULL default now(),
    `updated_at` DATETIME   NOT NULL default now(),
    `deleted_at` DATETIME   NULL
);

DROP TABLE IF EXISTS `roles`;

CREATE TABLE `roles`
(
    `id`          BIGINT(20)   NOT NULL auto_increment primary key ,
    `name`       VARCHAR(255) NOT NULL,
    `created_at` DATETIME     NOT NULL default now(),
    `updated_at` DATETIME     NOT NULL default now(),
    `deleted_at` DATETIME     NULL
);

DROP TABLE IF EXISTS `user_settings`;

CREATE TABLE `user_settings`
(
    `id`          BIGINT(20)   NOT NULL auto_increment primary key ,
    `user_id`    BIGINT(20) NOT NULL,
    `created_at` DATETIME   NOT NULL default now(),
    `updated_at` DATETIME   NOT NULL default now(),
    `deleted_at` DATETIME   NULL
);

DROP TABLE IF EXISTS `notice`;

CREATE TABLE `notice`
(
    `id`          BIGINT(20)   NOT NULL auto_increment,
    `user_id`    BIGINT(20)   NOT NULL,
    `content`    VARCHAR(255) NOT NULL,
    `is_read`    BIT(1)       NOT NULL DEFAULT false,
    `created_at` DATETIME     NOT NULL,
    `updated_at` DATETIME     NOT NULL,
    `deleted_at` DATETIME     NULL
);

DROP TABLE IF EXISTS `images`;

CREATE TABLE `images`
(
    `id`          BIGINT(20)   NOT NULL auto_increment,
    `url`        VARCHAR(255) NOT NULL,
    `extension`  VARCHAR(255) NOT NULL,
    `file_name`  VARCHAR(255) NOT NULL,
    `ret_type`   VARCHAR(255) NOT NULL,
    `ref_id`     VARCHAR(255) NOT NULL,
    `created_at` DATETIME     NOT NULL,
    `updated_at` DATETIME     NOT NULL,
    `deleted_at` DATETIME     NULL
);

DROP TABLE IF EXISTS `teams`;

CREATE TABLE `teams`
(
    `id`          BIGINT(20)   NOT NULL auto_increment,
    `name`        VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `created_at`  DATETIME     NOT NULL,
    `updated_at`  DATETIME     NOT NULL,
    `deleted_at`  DATETIME     NULL
);

DROP TABLE IF EXISTS `likes`;

CREATE TABLE `likes`
(
    `id`          BIGINT(20)   NOT NULL auto_increment,
    `user_id`    BIGINT(20) NOT NULL,
    `ref_type`   BIGINT(20) NOT NULL,
    `ref_id`     BIGINT(20) NOT NULL,
    `created_at` DATETIME   NOT NULL,
    `updated_at` DATETIME   NOT NULL,
    `deleted_at` DATETIME   NULL
);

DROP TABLE IF EXISTS `expressions`;

CREATE TABLE `expressions`
(
    `id`          BIGINT(20)   NOT NULL auto_increment,
    `project_id` BIGINT(20)   NOT NULL,
    `type`       TINYINT(1)   NOT NULL,
    `name`       VARCHAR(255) NOT NULL,
    `content`    VARCHAR(255) NOT NULL,
    `created_at` DATETIME     NOT NULL,
    `updated_at` DATETIME     NOT NULL,
    `deleted_at` DATETIME     NULL
);

DROP TABLE IF EXISTS `tags`;

CREATE TABLE `tags`
(
    `id`          BIGINT(20)   NOT NULL auto_increment,
    `project_id` BIGINT(20)   NOT NULL,
    `name`       VARCHAR(255) NOT NULL,
    `created_at` DATETIME     NOT NULL,
    `updated_at` DATETIME     NOT NULL,
    `deleted_at` DATETIME     NULL
);

DROP TABLE IF EXISTS `user_team`;

CREATE TABLE `user_team`
(
    `id`          BIGINT(20)   NOT NULL auto_increment,
    `user_id`    BIGINT(20) NOT NULL,
    `team_id`    BIGINT(20) NOT NULL,
    `created_at` DATETIME   NOT NULL,
    `updated_at` DATETIME   NOT NULL,
    `deleted_at` DATETIME   NULL
);

DROP TABLE IF EXISTS `edit_histories`;

CREATE TABLE `edit_histories`
(
    `id`          BIGINT(20)   NOT NULL auto_increment,
    `user_id`    BIGINT(20) NOT NULL,
    `id2`        BIGINT(20) NOT NULL,
    `ref_id`     BIGINT(20) NOT NULL,
    `ref_type`   BIGINT(20) NOT NULL,
    `edit_type`  BIGINT(20) NOT NULL,
    `created_at` DATETIME   NOT NULL,
    `updated_at` DATETIME   NOT NULL,
    `deleted_at` DATETIME   NULL
);

DROP TABLE IF EXISTS `projects`;

CREATE TABLE `projects`
(
    `id`          BIGINT(20)   NOT NULL auto_increment,
    `user_id`     BIGINT(20)   NOT NULL,
    `name`        VARCHAR(255) NOT NULL,
    `is_public`   BIT(1)       NOT NULL DEFAULT false,
    `is_locked`   BIT(1)       NOT NULL DEFAULT false,
    `description` VARCHAR(255) NOT NULL,
    `created_at`  DATETIME     NOT NULL,
    `updated_at`  DATETIME     NOT NULL,
    `deleted_at`  DATETIME     NULL
);

DROP TABLE IF EXISTS `oauths`;

CREATE TABLE `oauths`
(
    `id`          BIGINT(20)   NOT NULL auto_increment,
    `user_id`    BIGINT(20)   NOT NULL,
    `type`       TINYINT(1)   NOT NULL,
    `auth_id`    VARCHAR(255) NOT NULL,
    `created_at` DATETIME     NOT NULL,
    `updated_at` DATETIME     NOT NULL,
    `deleted_at` DATETIME     NULL
);

DROP TABLE IF EXISTS `values`;

CREATE TABLE `values`
(
    `id`          BIGINT(20)   NOT NULL auto_increment,
    `column_id`  BIGINT(20) NOT NULL,
    `value`      BIGINT(20) NOT NULL,
    `index`      BIGINT(20) NOT NULL,
    `created_at` DATETIME   NOT NULL,
    `updated_at` DATETIME   NOT NULL,
    `deleted_at` DATETIME   NULL
);

DROP TABLE IF EXISTS `columns`;

CREATE TABLE `columns`
(
    `id`           BIGINT(20)   NOT NULL auto_increment,
    `expression_id` BIGINT(20)   NOT NULL,
    `name`          VARCHAR(255) NOT NULL,
    `index`         BIGINT(20)   NOT NULL,
    `created_at`    DATETIME     NOT NULL,
    `updated_at`    DATETIME     NOT NULL,
    `deleted_at`    DATETIME     NULL
);

DROP TABLE IF EXISTS `comments`;

CREATE TABLE `comments`
(
    `id`          BIGINT(20)   NOT NULL auto_increment,
    `user_id`    BIGINT(20)   NOT NULL,
    `content`    VARCHAR(255) NOT NULL,
    `ref_type`   BIGINT(20)   NOT NULL,
    `ref_id`     BIGINT(20)   NOT NULL,
    `created_at` DATETIME     NOT NULL,
    `updated_at` DATETIME     NOT NULL,
    `deleted_at` DATETIME     NULL
);

DROP TABLE IF EXISTS `project_settings`;

CREATE TABLE `project_settings`
(
    `id`          BIGINT(20)   NOT NULL auto_increment,
    `project_id` BIGINT(20) NOT NULL,
    `created_at` DATETIME   NOT NULL,
    `updated_at` DATETIME   NOT NULL,
    `deleted_at` DATETIME   NULL
);


DROP TABLE IF EXISTS `edit_history_value_varchars`;

CREATE TABLE `edit_history_value_varchars`
(
    `id`             BIGINT(20)   NOT NULL,
    `edit_history_id` BIGINT(20)   NOT NULL,
    `value`           VARCHAR(255) NOT NULL,
    `created_at`      DATETIME     NOT NULL,
    `updated_at`      DATETIME     NOT NULL,
    `deleted_at`      DATETIME     NULL
);

DROP TABLE IF EXISTS `edit_history_value_bigints`;

CREATE TABLE `edit_history_value_bigints`
(
    `id`             BIGINT(20) NOT NULL,
    `edit_history_id` BIGINT(20) NOT NULL,
    `value`           BIGINT(20) NOT NULL,
    `created_at`      DATETIME   NOT NULL,
    `updated_at`      DATETIME   NOT NULL,
    `deleted_at`      DATETIME   NULL
);

ALTER TABLE `users`
    ADD CONSTRAINT `pk_users` PRIMARY KEY (`id`);

ALTER TABLE `user_role`
    ADD CONSTRAINT `pk_user_role` PRIMARY KEY (`id`);

ALTER TABLE `roles`
    ADD CONSTRAINT `pk_roles` PRIMARY KEY (`id`);

ALTER TABLE `user_settings`
    ADD CONSTRAINT `pk_user_settings` PRIMARY KEY (`id`);

ALTER TABLE `notice`
    ADD CONSTRAINT `pk_notice` PRIMARY KEY (`id`);

ALTER TABLE `images`
    ADD CONSTRAINT `pk_images` PRIMARY KEY (`id`);

ALTER TABLE `teams`
    ADD CONSTRAINT `pk_teams` PRIMARY KEY (`id`);

ALTER TABLE `likes`
    ADD CONSTRAINT `pk_likes` PRIMARY KEY (`id`);

ALTER TABLE `expressions`
    ADD CONSTRAINT `pk_expressions` PRIMARY KEY (`id`);

ALTER TABLE `tags`
    ADD CONSTRAINT `pk_tags` PRIMARY KEY (`id`);

ALTER TABLE `user_team`
    ADD CONSTRAINT `pk_user_team` PRIMARY KEY (`id`);

ALTER TABLE `edit_histories`
    ADD CONSTRAINT `pk_edit_histories` PRIMARY KEY (`id`);

ALTER TABLE `projects`
    ADD CONSTRAINT `pk_projects` PRIMARY KEY (`id`);

ALTER TABLE `oauths`
    ADD CONSTRAINT `pk_oauths` PRIMARY KEY (`id`);

ALTER TABLE `values`
    ADD CONSTRAINT `pk_values` PRIMARY KEY (`id`);

ALTER TABLE `columns`
    ADD CONSTRAINT `pk_columns` PRIMARY KEY (`id`);

ALTER TABLE `comments`
    ADD CONSTRAINT `pk_comments` PRIMARY KEY (`id`);

ALTER TABLE `project_settings`
    ADD CONSTRAINT `pk_project_settings` PRIMARY KEY (`id`);


ALTER TABLE `edit_history_value_varchars`
    ADD CONSTRAINT `pk_edit_history_value_varchars` PRIMARY KEY (`id`);

ALTER TABLE `edit_history_value_bigints`
    ADD CONSTRAINT `pk_edit_history_value_bigints` PRIMARY KEY (`id`);

ALTER TABLE `user_role`
    ADD CONSTRAINT `fk_users_to_user_role` FOREIGN KEY (`user_id`) REFERENCES
        `users` (`id`);

ALTER TABLE `user_role`
    ADD CONSTRAINT `fk_roles_to_user_role` FOREIGN KEY (`role_id`) REFERENCES
        `roles` (`id`);

ALTER TABLE `user_settings`
    ADD CONSTRAINT `fk_users_to_user_settings` FOREIGN KEY (`user_id`)
        REFERENCES `users` (`id`);

ALTER TABLE `notice`
    ADD CONSTRAINT `fk_users_to_notice` FOREIGN KEY (`user_id`) REFERENCES
        `users` (`id`);

ALTER TABLE `likes`
    ADD CONSTRAINT `fk_users_to_likes` FOREIGN KEY (`user_id`) REFERENCES
        `users` (`id`);

ALTER TABLE `expressions`
    ADD CONSTRAINT `fk_projects_to_expressions` FOREIGN KEY (`project_id`)
        REFERENCES `projects` (`id`);

ALTER TABLE `tags`
    ADD CONSTRAINT `fk_projects_to_tags` FOREIGN KEY (`project_id`) REFERENCES
        `projects` (`id`);

ALTER TABLE `user_team`
    ADD CONSTRAINT `fk_users_to_user_team` FOREIGN KEY (`user_id`) REFERENCES
        `users` (`id`);

ALTER TABLE `user_team`
    ADD CONSTRAINT `fk_teams_to_user_team` FOREIGN KEY (`team_id`) REFERENCES
        `teams` (`id`);

ALTER TABLE `edit_histories`
    ADD CONSTRAINT `fk_users_to_edit_histories` FOREIGN KEY (`user_id`)
        REFERENCES `users` (`id`);

ALTER TABLE `edit_histories`
    ADD CONSTRAINT `fk_edit_histories_to_edit_histories` FOREIGN KEY (`id2`)
        REFERENCES `edit_histories` (`id`);

ALTER TABLE `projects`
    ADD CONSTRAINT `fk_users_to_projects` FOREIGN KEY (`user_id`) REFERENCES
        `users` (`id`);

ALTER TABLE `oauths`
    ADD CONSTRAINT `fk_users_to_oauths` FOREIGN KEY (`user_id`) REFERENCES
        `users` (`id`);

ALTER TABLE `values`
    ADD CONSTRAINT `fk_columns_to_values` FOREIGN KEY (`column_id`) REFERENCES
        `columns` (`id`);

ALTER TABLE `columns`
    ADD CONSTRAINT `fk_expressions_to_columns` FOREIGN KEY (`expression_id`)
        REFERENCES `expressions` (`id`);

ALTER TABLE `comments`
    ADD CONSTRAINT `fk_users_to_comments` FOREIGN KEY (`user_id`) REFERENCES
        `users` (`id`);

ALTER TABLE `project_settings`
    ADD CONSTRAINT `fk_projects_to_project_settings` FOREIGN KEY (`project_id`)
        REFERENCES `projects` (`id`);

ALTER TABLE `edit_history_value_varchars`
    ADD CONSTRAINT `fk_edit_histories_to_edit_history_value_varchars` FOREIGN KEY
        (`edit_history_id`) REFERENCES `edit_histories` (`id`);

ALTER TABLE `edit_history_value_bigints`
    ADD CONSTRAINT `fk_edit_histories_to_edit_history_value_bigints` FOREIGN KEY
        (edit_history_id) REFERENCES `edit_histories` (`id`);
