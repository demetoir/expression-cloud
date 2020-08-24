import { IBaseEntity } from '../../common/model/entity/base/base.interface';
import { IUserSetting } from '../user-setting/user-setting.interface';
import { IOauth } from '../user-oauth/user-oauth.interface';
import { INotice } from '../../notice/notice.interface';
import { IEditHistory } from '../../history/edit-history.interface';
import { IExpression } from '../../expression/expression/expression.interface';
import { IComment } from '../../comment/comment.interface';
import { ITeam } from '../../team/team.interface';
import { IUserProfileImage } from '../user-profile-image/user-profile-image.interface';
import { IRole } from '../role/role.interface';

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
