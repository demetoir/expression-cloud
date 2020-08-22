import { IBaseEntity } from '../base/base.interface';
import { UserSettingEntity } from './userSetting.entity';
import { OauthEntity } from './oauth.entity';
import { NoticeEntity } from '../notice/notice.entity';
import { EditHistoryEntity } from '../edit-history/edit-history.entity';
import { ExpressionEntity } from '../expression/expression.entity';
import { UserProfileImageEntity } from './userProfileImage.entity';
import { CommentEntity } from '../comment/comment.entity';
import { RoleEntity } from '../role/role.entity';
import { TeamEntity } from '../team/team.entity';
import { IUserEntity } from './user.interface';

export declare interface IUserSetting extends IBaseEntity {
	id: number;

	createdAt: Date;

	updatedAt: Date;

	deletedAt: Date;

	name: string;

	email: string;

	description: string;

	isAnonymous: boolean;

	likedCount: number;

	forkedCount: number;

	setting: Promise<UserSettingEntity>;

	oauth: OauthEntity;

	notices: NoticeEntity[];

	editHistories: EditHistoryEntity[];

	expressions: ExpressionEntity[];

	profileImage: UserProfileImageEntity;

	comments: CommentEntity[];

	roles: RoleEntity[];

	teams: TeamEntity[];

	likeToUsers: IUserEntity[];

	likeFromUsers: IUserEntity[];

	likeToExpressions: ExpressionEntity[];
}
