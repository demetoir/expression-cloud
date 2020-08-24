import { IBaseEntity } from '../common/model/entity/base/base.interface';
import { IUserProfileImage } from './user-profile-image.interface';
import { IUserSetting } from './userSetting/user-setting.interface';
import { IOauth } from './user-oauth.interface';
import { INotice } from '../notice/notice.interface';
import { IEditHistory } from '../history/edit-history.interface';
import { IExpression } from '../expression/expression.interface';
import { IComment } from '../comment/comment.interface';
import { IRole } from './role.interface';
import { ITeam } from '../team/team.interface';

export declare interface IUser extends IBaseEntity {
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

	oauth: IOauth;

	notices: INotice[];

	editHistories: IEditHistory[];

	expressions: IExpression[];

	profileImage: IUserProfileImage;

	comments: IComment[];

	roles: IRole[];

	teams: ITeam[];

	likeToUsers: IUser[];

	likeFromUsers: IUser[];

	likeToExpressions: IExpression[];
}
