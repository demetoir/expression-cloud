import { CommentEntity } from '../../../comment/comment.entity';
import { EditHistoryEntity } from '../../../history/edit-history.entity';
import { ExpressionEntity } from '../../../expression/expression/expression.entity';
import { ExpressionSettingEntity } from '../../../expression/expression-setting/expression-setting.entity';
import { ImageEntity } from '../../../image/image.entity';
import { NoticeEntity } from '../../../notice/notice.entity';
import { UserOauthEntity } from '../../../user/user-oauth/user-oauth.entity';
import { ScalarEntity } from '../../../scalar/scalar.entity';
import { TagEntity } from '../../../tag/tag.entity';
import { TeamEntity } from '../../../team/team.entity';
import { UserEntity } from '../../../user/user/user.entity';
import { VectorEntity } from '../../../vector/vector.entity';
import { ExpressionThumbnailImageEntity } from '../../../expression/expression-thumbnail-image/expression-thumbnail-image.entity';
import { UserSettingEntity } from '../../../user/user-setting/user-setting.entity';
import { RoleEntity } from '../../../user/role/role.entity';
import { UserProfileImageEntity } from '../../../user/user-profile-image/user-profile-image.entity';
import { UserLikeEntity } from '../../../user/user-like/user-like.entity';

const entities = [
	CommentEntity,
	EditHistoryEntity,
	ImageEntity,
	NoticeEntity,
	RoleEntity,
	ScalarEntity,
	TagEntity,
	TeamEntity,
	UserEntity,
	UserLikeEntity,
	UserSettingEntity,
	UserOauthEntity,
	UserProfileImageEntity,
	VectorEntity,
	ExpressionEntity,
	ExpressionSettingEntity,
	ExpressionThumbnailImageEntity,
];

export { entities };
