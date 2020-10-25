import { Column, JoinTable, ManyToMany, OneToMany, OneToOne } from 'typeorm';
import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { UserSettingEntity } from 'src/user-setting/user-setting.entity';
import { UserOauthEntity } from 'src/user-oauth/user-oauth.entity';
import { NoticeEntity } from 'src/notice/notice.entity';
import { EditHistoryEntity } from 'src/history/edit-history.entity';
import { ExpressionEntity } from 'src/expression/expression/expression.entity';
import { UserProfileImageEntity } from 'src/user-profile-image/user-profile-image.entity';
import { CommentEntity } from 'src/comment/comment.entity';
import { RoleEntity } from 'src/role/role.entity';
import { TeamEntity } from 'src/team/team.entity';
import { UserEntity } from 'src/user/model/user.entity';

// todo: 데코레이터의 공통부분 찾아보기
//   데코레이터의 중복된부분을 공통 데코레이터로 모으고 싶지만, 데코레이터의 인자로 들어가는 옵션이 너무 많다
// todo: 이놈들 파일 다 따로 따로 파일 분리해야한다.
export const NameColumn = (): PropertyDecorator => {
	return applyDecorators(
		ApiProperty({
			required: false,
		}),
		Column({
			name: 'name',
			type: 'varchar',
			length: 255,
			nullable: false,
		}),
	);
};

export const EmailColumn = (): PropertyDecorator => {
	return applyDecorators(
		ApiProperty(),
		Column({
			name: 'email',
			type: 'varchar',
			length: 255,
			nullable: true,
			default: null,
			unique: true,
		}),
	);
};

export const DescriptionColumn = (): PropertyDecorator => {
	return applyDecorators(
		ApiProperty(),
		Column({
			name: 'description',
			type: 'text',
			nullable: true,
			default: null,
		}),
	);
};

export const IsAnonymousColumn = (): PropertyDecorator => {
	return applyDecorators(
		ApiProperty(),
		Column({
			name: 'is_anonymous',
			type: 'boolean',
			nullable: false,
			default: false,
		}),
	);
};

export const LikeCountColumn = (): PropertyDecorator => {
	return applyDecorators(
		ApiProperty(),
		Column({
			name: 'liked_count',
			type: 'integer',
			nullable: false,
			default: 0,
		}),
	);
};

export const ForkCountColumn = (): PropertyDecorator => {
	return applyDecorators(
		ApiProperty(),
		Column({
			name: 'forked_count',
			type: 'integer',
			nullable: false,
			default: 0,
		}),
	);
};

export const UserSettingsRelation = (): PropertyDecorator => {
	return applyDecorators(
		ApiProperty(),
		OneToOne(
			() => UserSettingEntity,
			(setting) => setting.user,
		),
	);
};

export const UserOauthRelation = (): PropertyDecorator => {
	return applyDecorators(
		ApiProperty(),
		OneToOne(
			() => UserOauthEntity,
			(oauth) => oauth.user,
		),
	);
};

export const NoticesRelation = (): PropertyDecorator => {
	return applyDecorators(
		ApiProperty(),
		OneToMany(
			() => NoticeEntity,
			(notices) => notices.user,
			{
				eager: false,
			},
		),
	);
};

export const EditHistoriesRelation = (): PropertyDecorator => {
	return applyDecorators(
		ApiProperty(),
		OneToMany(
			() => EditHistoryEntity,
			(editHistory) => editHistory.user,
			{
				eager: false,
			},
		),
	);
};

export const ExpressionsRelation = (): PropertyDecorator => {
	return applyDecorators(
		ApiProperty(),
		OneToMany(
			() => ExpressionEntity,
			(expresion) => expresion.user,
			{
				eager: false,
			},
		),
	);
};

export const UserProfileImageRelation = (): PropertyDecorator => {
	return applyDecorators(
		ApiProperty(),
		OneToOne(
			() => UserProfileImageEntity,
			(object) => object.user,
		),
	);
};

export const CommentsRelation = (): PropertyDecorator => {
	return applyDecorators(
		ApiProperty(),
		OneToMany(
			() => CommentEntity,
			(comments) => comments.user,
		),
	);
};

export const RolesRelation = (): PropertyDecorator => {
	return applyDecorators(
		ApiProperty(),
		ManyToMany(() => RoleEntity, {
			eager: false,
			cascade: true,
		}),
		JoinTable({
			name: 'user_role',
			joinColumn: {
				name: 'user_id',
				referencedColumnName: 'id',
			},
			inverseJoinColumn: {
				name: 'role_id',
				referencedColumnName: 'id',
			},
		}),
	);
};

export const TeamsRelation = (): PropertyDecorator => {
	return applyDecorators(
		ApiProperty(),
		ManyToMany(
			() => TeamEntity,
			(team) => team.users,
		),
	);
};

export const LikeToUsersRelation = (): PropertyDecorator => {
	return applyDecorators(
		ManyToMany(
			() => UserEntity,
			(object) => object.likeFromUsers,
			{
				eager: false,
			},
		),
		JoinTable({
			name: 'user_likes',
			joinColumn: {
				name: 'to_user_id',
				referencedColumnName: 'id',
			},
			inverseJoinColumn: {
				name: 'from_user_id',
				referencedColumnName: 'id',
			},
		}),
	);
};

export const LikeFromUsersRelation = (): PropertyDecorator => {
	return applyDecorators(
		ManyToMany(
			() => UserEntity,
			(object) => object.likeToUsers,
		),
		JoinTable({
			name: 'user_likes',
			joinColumn: {
				name: 'from_user_id',
				referencedColumnName: 'id',
			},
			inverseJoinColumn: {
				name: 'to_user_id',
				referencedColumnName: 'id',
			},
		}),
	);
};

export const LikeToExpressionsRelation = (): PropertyDecorator => {
	return applyDecorators(
		ManyToMany(
			() => ExpressionEntity,
			(expression) => expression.likeFrom,
			{
				eager: false,
			},
		),
		JoinTable({
			name: 'expression_likes',
			joinColumn: {
				name: 'from_user_id',
				referencedColumnName: 'id',
			},
			inverseJoinColumn: {
				name: 'to_expression_id',
				referencedColumnName: 'id',
			},
		}),
	);
};
