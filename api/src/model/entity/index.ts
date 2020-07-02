import { CommentEntity } from './comment.entity';
import { EditHistoryEntity } from './editHistory.entity';
import { ExpressionEntity } from './expression.entity';
import { ExpressionSettingEntity } from './expressionSetting.entity';
import { ImageEntity } from './image.entity';
import { LikeEntity } from './like.entity';
import { NoticeEntity } from './notice.entity';
import { OauthEntity } from './oauth.entity';
import { RoleEntity } from './role.entity';
import { ScalarEntity } from './scalar.entity';
import { TagEntity } from './tag.entity';
import { TeamEntity } from './team.entity';
import { UserEntity } from './user.entity';
import { UserSettingEntity } from './userSetting.entity';
import { VectorEntity } from './vector.entity';

const entities = [
	CommentEntity,
	EditHistoryEntity,
	ExpressionSettingEntity,
	ExpressionEntity,
	ImageEntity,
	LikeEntity,
	NoticeEntity,
	OauthEntity,
	RoleEntity,
	ScalarEntity,
	TagEntity,
	TeamEntity,
	UserEntity,
	UserSettingEntity,
	VectorEntity,
];

export { entities };
