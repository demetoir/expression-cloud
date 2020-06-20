DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`
(
    `id`          bigint   primary key NOT NULL auto_increment,
    `name`        VARCHAR(255) NOT NULL,
    `email`       text         NOT NULL,
    `description` text         NOT NULL,
    `created_at`  DATETIME     NOT NULL default now(),
    `updated_at`  DATETIME     NOT NULL default now(),
    `deleted_at`  DATETIME     NULL
);

;
DROP TABLE IF EXISTS `roles`;

CREATE TABLE `roles`
(
    `id`         bigint   primary key NOT NULL auto_increment,
    `name`       VARCHAR(255) NOT NULL,
    `created_at` DATETIME     NOT NULL default now(),
    `updated_at` DATETIME     NOT NULL default now(),
    `deleted_at` DATETIME     NULL
);


DROP TABLE IF EXISTS `user_role`;

CREATE TABLE `user_role`
(
    `id`         bigint primary key NOT NULL auto_increment,
    `user_id`    bigint NULL,
    `role_id`    bigint NULL,
    `created_at` DATETIME   NOT NULL default now(),
    `updated_at` DATETIME   NOT NULL default now(),
    `deleted_at` DATETIME   NULL

);

DROP TABLE IF EXISTS `user_settings`;


DROP TABLE IF EXISTS `notice`;

CREATE TABLE `notice`
(
    `id`         bigint primary key NOT NULL auto_increment,
    `user_id`    bigint NULL,
    `content`    text       NOT NULL,
    `is_read`    tinyint(1) NOT NULL DEFAULT false,
    `created_at` DATETIME   NOT NULL default now(),
    `updated_at` DATETIME   NOT NULL default now(),
    `deleted_at` DATETIME   NULL
);


DROP TABLE IF EXISTS `images`;

CREATE TABLE `images`
(
    `id`         bigint   primary key NOT NULL auto_increment,
    `url`        text         NOT NULL,
    `extension`  VARCHAR(255) NOT NULL,
    `file_name`  text         NOT NULL,
    `ret_type`   bigint   NULL,
    `ref_id`     bigint   NULL,
    `created_at` DATETIME     NOT NULL default now(),
    `updated_at` DATETIME     NOT NULL default now(),
    `deleted_at` DATETIME     NULL
);

DROP TABLE IF EXISTS `teams`;

CREATE TABLE `teams`
(
    `id`          bigint   primary key NOT NULL auto_increment,
    `name`        VARCHAR(255) NOT NULL,
    `description` text         NOT NULL,
    `created_at`  DATETIME     NOT NULL default now(),
    `updated_at`  DATETIME     NOT NULL default now(),
    `deleted_at`  DATETIME     NULL
);

DROP TABLE IF EXISTS `likes`;

CREATE TABLE `likes`
(
    `id`         bigint primary key NOT NULL auto_increment,
    `user_id`    bigint NULL,
    `ref_type`   bigint NOT NULL,
    `ref_id`     bigint NULL,
    `created_at` DATETIME   NOT NULL default now(),
    `updated_at` DATETIME   NOT NULL default now(),
    `deleted_at` DATETIME   NULL
);



DROP TABLE IF EXISTS `expressions`;

CREATE TABLE `expressions`
(
    `id`         bigint   primary key NOT NULL auto_increment,
    `project_id` bigint   NULL,
    `type`       TINYINT(1)   NOT NULL,
    `name`       VARCHAR(255) NOT NULL,
    `content`    text         NOT NULL,
    `created_at` DATETIME     NOT NULL default now(),
    `updated_at` DATETIME     NOT NULL default now(),
    `deleted_at` DATETIME     NULL
);

DROP TABLE IF EXISTS `tags`;

CREATE TABLE `tags`
(
    `id`         bigint   primary key NOT NULL auto_increment,
    `project_id` bigint   NULL,
    `name`       VARCHAR(255) NOT NULL,
    `created_at` DATETIME     NOT NULL default now(),
    `updated_at` DATETIME     NOT NULL default now(),
    `deleted_at` DATETIME     NULL
);

DROP TABLE IF EXISTS `user_team`;

CREATE TABLE `user_team`
(
    `id`         bigint primary key NOT NULL auto_increment,
    `user_id`    bigint NULL,
    `team_id`    bigint NULL,
    `created_at` DATETIME   NOT NULL default now(),
    `updated_at` DATETIME   NOT NULL default now(),
    `deleted_at` DATETIME   NULL
);



DROP TABLE IF EXISTS `edit_histories`;

CREATE TABLE `edit_histories`
(
    `id`         bigint primary key NOT NULL auto_increment,
    `prev_id`    bigint NULL,
    `user_id`    bigint NULL,
    `ref_id`     bigint NULL,
    `ref_type`   bigint NULL,
    `edit_type`  bigint NULL,
    `created_at` DATETIME   NOT NULL default now(),
    `updated_at` DATETIME   NOT NULL default now(),
    `deleted_at` DATETIME   NULL
);

DROP TABLE IF EXISTS `projects`;

CREATE TABLE `projects`
(
    `id`          bigint   primary key NOT NULL auto_increment,
    `user_id`     bigint   NULL,
    `name`        VARCHAR(255) NOT NULL,
    `is_public`   tinyint(1)   NOT NULL DEFAULT false,
    `is_locked`   tinyint(1)   NOT NULL DEFAULT false,
    `description` text         NOT NULL,
    `created_at`  DATETIME     NOT NULL default now(),
    `updated_at`  DATETIME     NOT NULL default now(),
    `deleted_at`  DATETIME     NULL
);

DROP TABLE IF EXISTS `oauths`;

CREATE TABLE `oauths`
(
    `id`         bigint   primary key NOT NULL auto_increment,
    `user_id`    bigint   NULL,
    `type`       TINYINT(1)   NOT NULL,
    `auth_id`    VARCHAR(255) NOT NULL,
    `created_at` DATETIME     NOT NULL default now(),
    `updated_at` DATETIME     NOT NULL default now(),
    `deleted_at` DATETIME     NULL
);



DROP TABLE IF EXISTS `values`;

CREATE TABLE `values`
(
    `id`         bigint primary key NOT NULL auto_increment,
    `column_id`  bigint NULL,
    `value`      bigint NOT NULL,
    `index`      bigint NOT NULL,
    `created_at` DATETIME   NOT NULL default now(),
    `updated_at` DATETIME   NOT NULL default now(),
    `deleted_at` DATETIME   NULL
);

DROP TABLE IF EXISTS `columns`;

CREATE TABLE `columns`
(
    `id`            bigint   primary key NOT NULL auto_increment,
    `expression_id` bigint   NULL,
    `name`          VARCHAR(255) NOT NULL,
    `index`         bigint   NOT NULL,
    `created_at`    DATETIME     NOT NULL default now(),
    `updated_at`    DATETIME     NOT NULL default now(),
    `deleted_at`    DATETIME     NULL
);

DROP TABLE IF EXISTS `comments`;

CREATE TABLE `comments`
(
    `id`         bigint primary key NOT NULL auto_increment,
    `user_id`    bigint NULL,
    `content`    text       NOT NULL,
    `ref_type`   bigint NULL,
    `ref_id`     bigint NULL,
    `created_at` DATETIME   NOT NULL default now(),
    `updated_at` DATETIME   NOT NULL default now(),
    `deleted_at` DATETIME   NULL
);

DROP TABLE IF EXISTS `project_settings`;

CREATE TABLE `project_settings`
(
    `id`         bigint primary key NOT NULL auto_increment,
    `project_id` bigint NULL,
    `created_at` DATETIME   NOT NULL default now(),
    `updated_at` DATETIME   NOT NULL default now(),
    `deleted_at` DATETIME   NULL
);



DROP TABLE IF EXISTS `edit_history_value_varchars`;

CREATE TABLE `edit_history_value_varchars`
(
    `id`              bigint   primary key NOT NULL auto_increment,
    `edit_history_id` bigint   NULL,
    `value`           VARCHAR(255) NOT NULL,
    `created_at`      DATETIME     NOT NULL default now(),
    `updated_at`      DATETIME     NOT NULL default now(),
    `deleted_at`      DATETIME     NULL
);

DROP TABLE IF EXISTS `edit_history_value_bigints`;

CREATE TABLE `edit_history_value_bigints`
(
    `id`              bigint primary key NOT NULL auto_increment,
    `edit_history_id` bigint NULL,
    `value`           bigint NOT NULL,
    `created_at`      DATETIME   NOT NULL default now(),
    `updated_at`      DATETIME   NOT NULL default now(),
    `deleted_at`      DATETIME   NULL
);



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
    ADD CONSTRAINT `fk_edit_histories_to_edit_histories` FOREIGN KEY (`prev_id`)
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











