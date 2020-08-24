import { IBaseEntity } from '../common/model/entity/base/base.interface';
import { IUser } from '../common/model/entity/user/user.interface';
import { IExpressionSetting } from './expression-setting.interface';
import { IExpressionThumbnailImage } from './expression-thumbnail-image.interface';
import { ITag } from '../tag/tag.interface';
import { IVector } from '../vector/vector.interface';

export interface IExpression extends IBaseEntity {
	type: number;

	name: string;

	content: string;

	description: string;

	likeCount: number;

	isForked: boolean;

	forkCount: number;

	forkedTo: IExpression[];

	vectors: IVector[];

	setting: IExpressionSetting;

	tags: ITag[];

	thumbnailImage: IExpressionThumbnailImage;

	user: IUser;

	forkedFrom: IExpression;

	likeFrom: IUser[];
}
