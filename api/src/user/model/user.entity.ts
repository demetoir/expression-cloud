import { Entity, JoinTable, ManyToMany, OneToMany, OneToOne } from 'typeorm';
import { NoticeEntity } from 'src/notice/notice.entity';
import { TeamEntity } from 'src/team/team.entity';
import { EditHistoryEntity } from 'src/history/edit-history.entity';
import { CommentEntity } from 'src/comment/comment.entity';
import { UserOauthEntity } from 'src/user-oauth/user-oauth.entity';
import { ExpressionEntity } from 'src/expression/expression/expression.entity';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common/model/entity/base/base.entity';
import { UserSettingEntity } from 'src/user-setting/user-setting.entity';
import { UserProfileImageEntity } from 'src/user-profile-image/user-profile-image.entity';
import { RoleEntity } from 'src/role/role.entity';
import {
	BooleanColumn,
	IntColumn,
	TextColumn,
	VarcharColumn,
} from 'src/common';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
	@ApiProperty({
		required: false,
	})
	@VarcharColumn({
		name: 'name',
		length: 255,
	})
	name: string;

	@ApiProperty()
	@VarcharColumn({
		name: 'email',
		length: 255,
		nullable: true,
		default: null,
		unique: true,
	})
	email?: string;

	@ApiProperty()
	@TextColumn({
		name: 'description',
		nullable: true,
		default: null,
	})
	description?: string;

	@ApiProperty()
	@BooleanColumn({
		name: 'is_anonymous',
		default: false,
	})
	isAnonymous: boolean;

	@ApiProperty()
	@IntColumn({
		name: 'liked_count',
		default: 0,
	})
	likedCount: number;

	@ApiProperty()
	@IntColumn({
		name: 'forked_count',
		default: 0,
	})
	forkedCount: number;

	// relation

	@ApiProperty()
	@OneToOne(() => UserSettingEntity, (setting) => setting.user)
	setting: Promise<UserSettingEntity>;

	@ApiProperty()
	@OneToOne(() => UserOauthEntity, (oauth) => oauth.user)
	oauth: UserOauthEntity;

	@ApiProperty()
	@OneToMany(() => NoticeEntity, (notices) => notices.user, {
		eager: false,
	})
	notices: NoticeEntity[];

	@ApiProperty()
	@OneToMany(() => EditHistoryEntity, (editHistory) => editHistory.user, {
		eager: false,
	})
	editHistories: EditHistoryEntity[];

	@ApiProperty()
	@OneToMany(() => ExpressionEntity, (expresion) => expresion.user, {
		eager: false,
	})
	expressions: ExpressionEntity[];

	@ApiProperty()
	@OneToOne(() => UserProfileImageEntity, (object) => object.user)
	profileImage: UserProfileImageEntity;

	@ApiProperty()
	@OneToMany(() => CommentEntity, (comments) => comments.user)
	comments: CommentEntity[];

	@ApiProperty()
	@ManyToMany(() => RoleEntity, {
		eager: false,
		cascade: true,
	})
	@JoinTable({
		name: 'user_role',
		joinColumn: {
			name: 'user_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'role_id',
			referencedColumnName: 'id',
		},
	})
	roles: RoleEntity[];

	@ApiProperty()
	@ManyToMany(() => TeamEntity, (team) => team.users)
	teams: TeamEntity[];

	@ManyToMany(() => UserEntity, (object) => object.likeFromUsers, {
		eager: false,
	})
	@JoinTable({
		name: 'user_likes',
		joinColumn: {
			name: 'to_user_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'from_user_id',
			referencedColumnName: 'id',
		},
	})
	likeToUsers: UserEntity[];

	@ManyToMany(() => UserEntity, (object) => object.likeToUsers)
	@JoinTable({
		name: 'user_likes',
		joinColumn: {
			name: 'from_user_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'to_user_id',
			referencedColumnName: 'id',
		},
	})
	likeFromUsers: UserEntity[];

	@ManyToMany(() => ExpressionEntity, (expression) => expression.likeFrom, {
		eager: false,
	})
	@JoinTable({
		name: 'expression_likes',
		joinColumn: {
			name: 'from_user_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'to_expression_id',
			referencedColumnName: 'id',
		},
	})
	likeToExpressions: ExpressionEntity[];
}
