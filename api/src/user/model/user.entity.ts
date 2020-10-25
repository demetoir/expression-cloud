import { Entity } from 'typeorm';
import { NoticeEntity } from 'src/notice/notice.entity';
import { TeamEntity } from 'src/team/team.entity';
import { EditHistoryEntity } from 'src/history/edit-history.entity';
import { CommentEntity } from 'src/comment/comment.entity';
import { UserOauthEntity } from 'src/user-oauth/user-oauth.entity';
import { ExpressionEntity } from 'src/expression/expression/expression.entity';
import { UserSettingEntity } from 'src/user-setting/user-setting.entity';
import { UserProfileImageEntity } from 'src/user-profile-image/user-profile-image.entity';
import { RoleEntity } from 'src/role/role.entity';
import { BaseEntity } from 'src/common/model/entity/base/base.entity';
import {
	CommentsRelation,
	DescriptionColumn,
	EditHistoriesRelation,
	EmailColumn,
	ExpressionsRelation,
	ForkCountColumn,
	IsAnonymousColumn,
	LikeCountColumn,
	LikeFromUsersRelation,
	LikeToExpressionsRelation,
	LikeToUsersRelation,
	NameColumn,
	NoticesRelation,
	RolesRelation,
	TeamsRelation,
	UserOauthRelation,
	UserProfileImageRelation,
	UserSettingsRelation,
} from 'src/user/decorators';

// 기존 코드에 비해 데코레이터가 차지하는 부분이 너무 크고 코드 읽기시 집중력에 심한 낭비가 오므
// 각 필드마다 필요한 데코레이터를 모두 분리하였다.
// 각 필드는 디비의 컬럼에 매칭되기 때문이고, 서로 직교적이기 떄문에 분리하더라도 유지보수시 상관없다

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
	id: number;

	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date;

	@NameColumn()
	name: string;

	@EmailColumn()
	email: string;

	@DescriptionColumn()
	description: string;

	@IsAnonymousColumn()
	isAnonymous: boolean;

	@LikeCountColumn()
	likedCount: number;

	@ForkCountColumn()
	forkedCount: number;

	@UserSettingsRelation()
	setting: Promise<UserSettingEntity>;

	@UserOauthRelation()
	oauth: UserOauthEntity;

	@NoticesRelation()
	notices: NoticeEntity[];

	@EditHistoriesRelation()
	editHistories: EditHistoryEntity[];

	@ExpressionsRelation()
	expressions: ExpressionEntity[];

	@UserProfileImageRelation()
	profileImage: UserProfileImageEntity;

	@CommentsRelation()
	comments: CommentEntity[];

	@RolesRelation()
	roles: RoleEntity[];

	@TeamsRelation()
	teams: TeamEntity[];

	@LikeToUsersRelation()
	likeToUsers: UserEntity[];

	@LikeFromUsersRelation()
	likeFromUsers: UserEntity[];

	@LikeToExpressionsRelation()
	likeToExpressions: ExpressionEntity[];
}
