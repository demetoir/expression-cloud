import { CommentEntity } from './comment/comment.entity';
import { EditHistoryEntity } from './edit-history/edit-history.entity';
import { ExpressionEntity } from './expression/expression.entity';
import { ExpressionSettingEntity } from './expression/expression-setting.entity';
import { ImageEntity } from './image/image.entity';
import { NoticeEntity } from './notice/notice.entity';
import { UserOauthEntity } from './user/user-oauth.entity';
import { RoleEntity } from './role/role.entity';
import { ScalarEntity } from './scalar/scalar.entity';
import { TagEntity } from './tag/tag.entity';
import { TeamEntity } from './team/team.entity';
import { UserEntity } from './user/user.entity';
import { VectorEntity } from '../../../vector/vector.entity';
import { ExpressionThumbnailImageEntity } from './expression/expression-thumbnail-image.entity';
import { UserSettingEntity } from './user/user-setting.entity';
import { UserProfileImageEntity } from './user/user-profile-image.entity';

const entities = [
	CommentEntity,
	EditHistoryEntity,
	ExpressionSettingEntity,
	ExpressionEntity,
	ImageEntity,
	NoticeEntity,
	UserOauthEntity,
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
