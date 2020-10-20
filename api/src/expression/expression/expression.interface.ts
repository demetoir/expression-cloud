import { IBaseEntity } from 'src/common/model/entity/base/base.interface';
import { IUser } from 'src/user/user.interface';
import { IExpressionSetting } from '../expression-setting/expression-setting.interface';
import { IExpressionThumbnailImage } from '../expression-thumbnail-image/expression-thumbnail-image.interface';
import { ITag } from 'src/tag/tag.interface';
import { IVector } from 'src/vector/vector.interface';

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

	thumbnailImage: Promise<IExpressionThumbnailImage>;

	user: IUser;

	forkedFrom: IExpression;

	likeFrom: IUser[];
}
