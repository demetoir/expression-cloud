import { CommentEntity } from 'src/comment/comment.entity';
import { EditHistoryEntity } from 'src/history/edit-history.entity';
import { ImageEntity } from 'src/image/image.entity';
import { NoticeEntity } from 'src/notice/notice.entity';
import { RoleEntity } from 'src/role/role.entity';
import { ExpressionThumbnailImageEntity } from 'src/expression/expression-thumbnail-image/expression-thumbnail-image.entity';
import { ExpressionEntity } from 'src/expression/expression/expression.entity';
import { ExpressionSettingEntity } from 'src/expression/expression-setting/expression-setting.entity';
import { VectorEntity } from 'src/vector/vector.entity';
import { ScalarEntity } from 'src/scalar/scalar.entity';
import { TagEntity } from 'src/tag/tag.entity';
import { TeamEntity } from 'src/team/team.entity';
import { UserEntity } from 'src/user/model/user.entity';
import { UserLikeEntity } from 'src/user-like/user-like.entity';
import { UserSettingEntity } from 'src/user-setting/user-setting.entity';
import { UserOauthEntity } from 'src/user-oauth/user-oauth.entity';
import { UserProfileImageEntity } from 'src/user-profile-image/user-profile-image.entity';

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
