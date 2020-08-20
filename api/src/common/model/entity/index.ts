import { CommentEntity } from './comment/comment.entity';
import { EditHistoryEntity } from './edit-history/editHistory.entity';
import { ExpressionEntity } from './expression/expression.entity';
import { ExpressionSettingEntity } from './expression/expressionSetting.entity';
import { ImageEntity } from './image/image.entity';
import { NoticeEntity } from './notice/notice.entity';
import { OauthEntity } from './user/oauth.entity';
import { RoleEntity } from './role/role.entity';
import { ScalarEntity } from './scalar/scalar.entity';
import { TagEntity } from './tag/tag.entity';
import { TeamEntity } from './team/team.entity';
import { UserEntity } from './user/user.entity';
import { UserSettingEntity } from './user/userSetting.entity';
import { VectorEntity } from './vector/vector.entity';
import { ExpressionThumbnailImageEntity } from './expression/expressionThumbnailImage.entity';
import { UserProfileImageEntity } from './user/userProfileImage.entity';

const entities = [
	CommentEntity,
	EditHistoryEntity,
	ExpressionSettingEntity,
	ExpressionEntity,
	ImageEntity,
	NoticeEntity,
	OauthEntity,
	RoleEntity,
	ScalarEntity,
	TagEntity,
	TeamEntity,
	UserEntity,
	UserSettingEntity,
	VectorEntity,
	ExpressionThumbnailImageEntity,
	UserProfileImageEntity,
];

export { entities };
