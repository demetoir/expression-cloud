import { IBaseEntity } from '../base/base.interface';
import { OauthEntity } from './oauth.entity';
import { NoticeEntity } from '../notice/notice.entity';
import { EditHistoryEntity } from '../edit-history/edit-history.entity';
import { ExpressionEntity } from '../expression/expression.entity';
import { CommentEntity } from '../comment/comment.entity';
import { RoleEntity } from '../role/role.entity';
import { TeamEntity } from '../team/team.entity';
import { IUserProfileImage } from './user-profile-image.interface';
import { IUserSetting } from './user-setting.interface';

export declare interface IUserEntity extends IBaseEntity {
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

	setting: Promise<IUserSetting>;

	oauth: OauthEntity;

	notices: NoticeEntity[];

	editHistories: EditHistoryEntity[];

	expressions: ExpressionEntity[];

	profileImage: IUserProfileImage;

	comments: CommentEntity[];

	roles: RoleEntity[];

	teams: TeamEntity[];

	likeToUsers: IUserEntity[];

	likeFromUsers: IUserEntity[];

	likeToExpressions: ExpressionEntity[];
}
