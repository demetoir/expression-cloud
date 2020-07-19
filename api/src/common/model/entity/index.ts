import { CommentEntity } from './comment.entity';
import { EditHistoryEntity } from './editHistory.entity';
import { ExpressionEntity } from './expression.entity';
import { ExpressionSettingEntity } from './expressionSetting.entity';
import { ImageEntity } from './image.entity';
import { NoticeEntity } from './notice.entity';
import { OauthEntity } from './oauth.entity';
import { RoleEntity } from './role.entity';
import { ScalarEntity } from './scalar.entity';
import { TagEntity } from './tag.entity';
import { TeamEntity } from './team.entity';
import { UserEntity } from './user.entity';
import { UserSettingEntity } from './userSetting.entity';
import { VectorEntity } from './vector.entity';
import { ExpressionThumbnailImageEntity } from './expressionThumbnailImage.entity';
import { UserProfileImageEntity } from './userProfileImage.entity';

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
