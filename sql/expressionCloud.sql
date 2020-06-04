-- TODO
--    마이그레이션은 typeorm 을에서 보기
--    SQL 파일 읽어서 수행하는 식으로 만들기
--    만들때 따로 따로 한테이블 씩 노가다해서 만들기

DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `users_roles`;
DROP TABLE IF EXISTS `roles`;
DROP TABLE IF EXISTS `user_settings`;
DROP TABLE IF EXISTS `notice`;
DROP TABLE IF EXISTS `images`;
DROP TABLE IF EXISTS `teams`;
DROP TABLE IF EXISTS `user_profile_images`;
DROP TABLE IF EXISTS `project_thumbnail_images`;
DROP TABLE IF EXISTS `likes`;
DROP TABLE IF EXISTS `expressions`;
DROP TABLE IF EXISTS `tags`;
DROP TABLE IF EXISTS `users_teams`;
DROP TABLE IF EXISTS `team_profile_images`;
DROP TABLE IF EXISTS `expressions_comments`;
DROP TABLE IF EXISTS `projects`;
DROP TABLE IF EXISTS `user_authorities`;
DROP TABLE IF EXISTS `values`;
DROP TABLE IF EXISTS `columns`;
DROP TABLE IF EXISTS `comments`;
DROP TABLE IF EXISTS `project_comments`;
DROP TABLE IF EXISTS `expresssion_comments`;
DROP TABLE IF EXISTS `project_settings`;

CREATE TABLE `users`
(
    `id`          BIGINT(20)   NOT NULL,
    `name`        VARCHAR(255) NOT NULL,
    `email`       VARCHAR(255) NOT NULL,
    `description` TEXT(1024)   NOT NULL,
    `created_at`  datetime     NOT NULL,
    `updated_at`  datetime     NOT NULL,
    `deleted_at`  datetime     NULL
);

CREATE TABLE `users_roles`
(
    `id`         BIGINT(20) NOT NULL,
    `user_id`    BIGINT(20) NOT NULL,
    `role_id`    BIGINT(20) NOT NULL,
    `created_at` datetime   NOT NULL,
    `updated_at` datetime   NOT NULL,
    `deleted_at` datetime   NULL
);

CREATE TABLE `roles`
(
    `id`         BIGINT(20)   NOT NULL,
    `name`       VARCHAR(255) NOT NULL,
    `created_at` datetime     NOT NULL,
    `updated_at` datetime     NOT NULL,
    `deleted_at` datetime     NULL
);

CREATE TABLE `user_settings`
(
    `id`         BIGINT(20) NOT NULL,
    `user_id`    BIGINT(20) NOT NULL,
    `created_at` datetime   NOT NULL,
    `updated_at` datetime   NOT NULL,
    `deleted_at` datetime   NULL
);

CREATE TABLE `notice`
(
    `id`         BIGINT(20)   NOT NULL,
    `user_id`    BIGINT(20)   NOT NULL,
    `content`    VARCHAR(255) NOT NULL,
    `is_read`    BIT(1)       NOT NULL DEFAULT FALSE,
    `created_at` datetime     NOT NULL,
    `updated_at` datetime     NOT NULL,
    `deleted_at` datetime     NULL
);

CREATE TABLE `images`
(
    `id`         BIGINT(20)   NOT NULL,
    `url`        VARCHAR(255) NOT NULL,
    `extension`  VARCHAR(255) NOT NULL,
    `file_name`  VARCHAR(255) NOT NULL,
    `created_at` datetime     NOT NULL,
    `updated_at` datetime     NOT NULL,
    `deleted_at` datetime     NULL
);

CREATE TABLE `teams`
(
    `id`          BIGINT(20)   NOT NULL,
    `name`        VARCHAR(255) NOT NULL,
    `description` TEXT(1024)   NOT NULL,
    `created_at`  datetime     NOT NULL,
    `updated_at`  datetime     NOT NULL,
    `deleted_at`  datetime     NULL
);

CREATE TABLE `user_profile_images`
(
    `id`         BIGINT(20) NOT NULL,
    `user_id`    BIGINT(20) NOT NULL,
    `image_id`   BIGINT(20) NOT NULL,
    `created_at` datetime   NOT NULL,
    `updated_at` datetime   NOT NULL,
    `deleted_at` datetime   NULL
);

CREATE TABLE `project_thumbnail_images`
(
    `id`         BIGINT(20) NOT NULL,
    `project_id` BIGINT(20) NOT NULL,
    `image_id`   BIGINT(20) NOT NULL,
    `created_at` datetime   NOT NULL,
    `updated_at` datetime   NOT NULL,
    `deleted_at` datetime   NULL
);

CREATE TABLE `likes`
(
    `id`         BIGINT(20) NOT NULL,
    `user_id`    BIGINT(20) NOT NULL,
    `project_id` BIGINT(20) NOT NULL,
    `created_at` datetime   NOT NULL,
    `updated_at` datetime   NOT NULL,
    `deleted_at` datetime   NULL
);

CREATE TABLE `expressions`
(
    `id`         BIGINT(20)   NOT NULL,
    `project_id` BIGINT(20)   NOT NULL,
    `type`       TINYINT(1)   NOT NULL,
    `index`      VARCHAR(255) NOT NULL,
    `name`       VARCHAR(255) NOT NULL,
    `content`    VARCHAR(255) NOT NULL,
    `created_at` datetime     NOT NULL,
    `updated_at` datetime     NOT NULL,
    `deleted_at` datetime     NULL
);

CREATE TABLE `tags`
(
    `id`         BIGINT(20)   NOT NULL,
    `project_id` BIGINT(20)   NOT NULL,
    `name`       VARCHAR(255) NOT NULL,
    `created_at` datetime     NOT NULL,
    `updated_at` datetime     NOT NULL,
    `deleted_at` datetime     NULL
);

CREATE TABLE `users_teams`
(
    `id`         BIGINT(20) NOT NULL,
    `user_id`    BIGINT(20) NOT NULL,
    `team_id`    BIGINT(20) NOT NULL,
    `created_at` datetime   NOT NULL,
    `updated_at` datetime   NOT NULL,
    `deleted_at` datetime   NULL
);

CREATE TABLE `team_profile_images`
(
    `id`         BIGINT(20) NOT NULL,
    `team_id`    BIGINT(20) NOT NULL,
    `image_id`   BIGINT(20) NOT NULL,
    `created_at` datetime   NOT NULL,
    `updated_at` datetime   NOT NULL,
    `deleted_at` datetime   NULL
);

CREATE TABLE `expression_histories`
(
    `id`            BIGINT(20)   NOT NULL,
    `expression_id` BIGINT(20)   NOT NULL,
    `user_id`       BIGINT(20)   NOT NULL,
    `type`          TINYINT(1)   NOT NULL,
    `old_content`   VARCHAR(255) NOT NULL,
    `new_content`   VARCHAR(255) NOT NULL,
    `created_at`    datetime     NOT NULL,
    `updated_at`    datetime     NOT NULL,
    `deleted_at`    datetime     NULL
);

CREATE TABLE `projects`
(
    `id`          BIGINT(20)   NOT NULL,
    `user_id`     BIGINT(20)   NOT NULL,
    `name`        VARCHAR(255) NOT NULL,
    `is_public`   BIT(1)       NOT NULL DEFAULT FALSE,
    `is_locked`   BIT(1)       NOT NULL DEFAULT FALSE,
    `description` TEXT(1024)   NOT NULL,
    `created_at`  datetime     NOT NULL,
    `updated_at`  datetime     NOT NULL,
    `deleted_at`  datetime     NULL
);

CREATE TABLE `user_authorities`
(
    `id`         BIGINT(20) NOT NULL,
    `user_id`    BIGINT(20) NOT NULL,
    `type`       TINYINT(1) NOT NULL,
    `created_at` datetime   NOT NULL,
    `updated_at` datetime   NOT NULL,
    `deleted_at` datetime   NULL
);

CREATE TABLE `values`
(
    `id`         BIGINT(20) NOT NULL,
    `column_id`  BIGINT(20) NOT NULL,
    `value`      BIGINT(20) NOT NULL,
    `index`      BIGINT(20) NOT NULL,
    `created_at` datetime   NOT NULL,
    `updated_at` datetime   NOT NULL,
    `deleted_at` datetime   NULL
);

CREATE TABLE `columns`
(
    `id`            BIGINT(20)   NOT NULL,
    `expression_id` BIGINT(20)   NOT NULL,
    `name`          VARCHAR(255) NOT NULL,
    `index`         BIGINT(20)   NOT NULL,
    `created_at`    datetime     NOT NULL,
    `updated_at`    datetime     NOT NULL,
    `deleted_at`    datetime     NULL
);

CREATE TABLE `comments`
(
    `id`         BIGINT(20)   NOT NULL,
    `user_id`    BIGINT(20)   NOT NULL,
    `content`    VARCHAR(255) NOT NULL,
    `created_at` datetime     NOT NULL,
    `updated_at` datetime     NOT NULL,
    `deleted_at` datetime     NULL
);

CREATE TABLE `project_comments`
(
    `id`         BIGINT(20) NOT NULL,
    `comment_id` BIGINT(20) NOT NULL,
    `project_id` BIGINT(20) NOT NULL,
    `created_at` datetime   NOT NULL,
    `updated_at` datetime   NOT NULL,
    `deleted_at` datetime   NULL
);

CREATE TABLE `expressions_comments`
(
    `id`            BIGINT(20) NOT NULL,
    `expression_id` BIGINT(20) NOT NULL,
    `comment_id`    BIGINT(20) NOT NULL,
    `created_at`    datetime   NOT NULL,
    `updated_at`    datetime   NOT NULL,
    `deleted_at`    datetime   NULL
);

CREATE TABLE `project_settings`
(
    `id`         BIGINT(20) NOT NULL,
    `project_id` BIGINT(20) NOT NULL,
    `created_at` datetime   NOT NULL,
    `updated_at` datetime   NOT NULL,
    `deleted_at` datetime   NULL
);

-- todo 이거는 제거하는 SQL 도 작성해야한다.

ALTER TABLE `users`
    ADD CONSTRAINT `PK_USERS` PRIMARY KEY (`id`);

ALTER TABLE `users_roles`
    ADD CONSTRAINT `PK_USER_ROLE` PRIMARY KEY (`id`);

ALTER TABLE `roles`
    ADD CONSTRAINT `PK_ROLES` PRIMARY KEY (`id`);

ALTER TABLE `user_settings`
    ADD CONSTRAINT `PK_USER_SETTINGS` PRIMARY KEY (`id`);

ALTER TABLE `notice`
    ADD CONSTRAINT `PK_NOTICE` PRIMARY KEY (`id`);

ALTER TABLE `images`
    ADD CONSTRAINT `PK_IMAGES` PRIMARY KEY (`id`);

ALTER TABLE `teams`
    ADD CONSTRAINT `PK_TEAMS` PRIMARY KEY (`id`);

ALTER TABLE `user_profile_images`
    ADD CONSTRAINT `PK_USER_PROFILE_IMAGES` PRIMARY KEY (`id`);

ALTER TABLE `project_thumbnail_images`
    ADD CONSTRAINT `PK_PROJECT_THUMBNAIL_IMAGES` PRIMARY KEY (`id`);

ALTER TABLE `likes`
    ADD CONSTRAINT `PK_LIKES` PRIMARY KEY (`id`);

ALTER TABLE `expressions`
    ADD CONSTRAINT `PK_EXPRESSION` PRIMARY KEY (`id`);

ALTER TABLE `tags`
    ADD CONSTRAINT `PK_TAGS` PRIMARY KEY (`id`);

ALTER TABLE `users_teams`
    ADD CONSTRAINT `PK_USER_TEAM` PRIMARY KEY (`id`);

ALTER TABLE `team_profile_images`
    ADD CONSTRAINT `PK_TEAM_PROFILE_IMAGES` PRIMARY KEY (`id`);

ALTER TABLE `expression_histories`
    ADD CONSTRAINT `PK_EXPRESSION_HISTORIES` PRIMARY KEY (`id`);

ALTER TABLE `projects`
    ADD CONSTRAINT `PK_PROJECT` PRIMARY KEY (`id`);

ALTER TABLE `user_authorities`
    ADD CONSTRAINT `PK_USER_AUTHORITIES` PRIMARY KEY (`id`);

ALTER TABLE `values`
    ADD CONSTRAINT `PK_VALUES` PRIMARY KEY (`id`);

ALTER TABLE `columns`
    ADD CONSTRAINT `PK_COLUMNS` PRIMARY KEY (`id`);

ALTER TABLE `comments`
    ADD CONSTRAINT `PK_COMMENTS` PRIMARY KEY (`id`);

ALTER TABLE `project_comments`
    ADD CONSTRAINT `PK_PROJECT_COMMENTS` PRIMARY KEY (`id`);

ALTER TABLE `expressions_comments`
    ADD CONSTRAINT `PK_EXPRESSIONS_COMMENTS` PRIMARY KEY (`id`);

ALTER TABLE `project_settings`
    ADD CONSTRAINT `PK_PROJECT_SETTINGS` PRIMARY KEY (`id`);


ALTER TABLE `users_roles`
    ADD CONSTRAINT `FK_users_TO_user_role` FOREIGN KEY (`user_id`)
        REFERENCES `users` (`id`);

ALTER TABLE `users_roles`
    ADD CONSTRAINT `FK_roles_TO_user_role` FOREIGN KEY (`role_id`)
        REFERENCES `roles` (`id`);

ALTER TABLE `user_settings`
    ADD CONSTRAINT `FK_users_TO_user_settings` FOREIGN KEY (`user_id`)
        REFERENCES `users` (`id`);

ALTER TABLE `notice`
    ADD CONSTRAINT `FK_users_TO_notice` FOREIGN KEY (`user_id`)
        REFERENCES `users` (`id`);

ALTER TABLE `user_profile_images`
    ADD CONSTRAINT `FK_users_TO_user_profile_images` FOREIGN KEY (`user_id`)
        REFERENCES `users` (`id`);

ALTER TABLE `user_profile_images`
    ADD CONSTRAINT `FK_images_TO_user_profile_images` FOREIGN KEY (`image_id`)
        REFERENCES `images` (`id`);

ALTER TABLE `project_thumbnail_images`
    ADD CONSTRAINT `FK_project_TO_project_thumbnail_images` FOREIGN KEY (`project_id`)
        REFERENCES `projects` (`id`);

ALTER TABLE `project_thumbnail_images`
    ADD CONSTRAINT `FK_images_TO_project_thumbnail_images` FOREIGN KEY (`image_id`)
        REFERENCES `images` (`id`);

ALTER TABLE `likes`
    ADD CONSTRAINT `FK_users_TO_likes` FOREIGN KEY (`user_id`)
        REFERENCES `users` (`id`);

ALTER TABLE `likes`
    ADD CONSTRAINT `FK_project_TO_likes` FOREIGN KEY (`project_id`)
        REFERENCES `projects` (`id`);

ALTER TABLE `expressions`
    ADD CONSTRAINT `FK_project_TO_expression` FOREIGN KEY (`project_id`)
        REFERENCES `projects` (`id`);

ALTER TABLE `tags`
    ADD CONSTRAINT `FK_project_TO_tags` FOREIGN KEY (`project_id`)
        REFERENCES `projects` (`id`);

ALTER TABLE `users_teams`
    ADD CONSTRAINT `FK_users_TO_user_team` FOREIGN KEY (`user_id`)
        REFERENCES `users` (`id`);

ALTER TABLE `users_teams`
    ADD CONSTRAINT `FK_teams_TO_user_team` FOREIGN KEY (`team_id`)
        REFERENCES `teams` (`id`);

ALTER TABLE `team_profile_images`
    ADD CONSTRAINT `FK_teams_TO_team_profile_images` FOREIGN KEY (`team_id`)
        REFERENCES `teams` (`id`);

ALTER TABLE `team_profile_images`
    ADD CONSTRAINT `FK_images_TO_team_profile_images` FOREIGN KEY (`image_id`)
        REFERENCES `images` (`id`);

ALTER TABLE `expression_histories`
    ADD CONSTRAINT `FK_expression_TO_expression_histories` FOREIGN KEY (`expression_id`)
        REFERENCES `expressions` (`id`);

ALTER TABLE `expression_histories`
    ADD CONSTRAINT `FK_users_TO_expression_histories` FOREIGN KEY (`user_id`)
        REFERENCES `users` (`id`);

ALTER TABLE `projects`
    ADD CONSTRAINT `FK_users_TO_project` FOREIGN KEY (`user_id`)
        REFERENCES `users` (`id`);

ALTER TABLE `user_authorities`
    ADD CONSTRAINT `FK_users_TO_user_authorities` FOREIGN KEY (`user_id`)
        REFERENCES `users` (`id`);

ALTER TABLE `values`
    ADD CONSTRAINT `FK_columns_TO_values` FOREIGN KEY (`column_id`)
        REFERENCES `columns` (`id`);

ALTER TABLE `columns`
    ADD CONSTRAINT `FK_expression_TO_columns` FOREIGN KEY (`expression_id`)
        REFERENCES `expressions` (`id`);

ALTER TABLE `comments`
    ADD CONSTRAINT `FK_users_TO_comments` FOREIGN KEY (`user_id`)
        REFERENCES `users` (`id`);

ALTER TABLE `project_comments`
    ADD CONSTRAINT `FK_comments_TO_project_comments` FOREIGN KEY (`comment_id`)
        REFERENCES `comments` (`id`);

ALTER TABLE `project_comments`
    ADD CONSTRAINT `FK_project_TO_project_comments` FOREIGN KEY (`project_id`)
        REFERENCES `projects` (`id`);

ALTER TABLE `expressions_comments`
    ADD CONSTRAINT `FK_expression_TO_expressions_comments` FOREIGN KEY (`expression_id`)
        REFERENCES `expressions` (`id`);

ALTER TABLE `expressions_comments`
    ADD CONSTRAINT `FK_comments_TO_expressions_comments` FOREIGN KEY (`comment_id`)
        REFERENCES `comments` (`id`);

ALTER TABLE `project_settings`
    ADD CONSTRAINT `FK_project_TO_project_settings` FOREIGN KEY (`project_id`)
        REFERENCES `projects` (`id`);

