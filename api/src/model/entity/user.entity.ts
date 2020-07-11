import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	OneToMany,
	OneToOne,
} from 'typeorm';
import { UserSettingEntity } from './userSetting.entity';
import { RoleEntity } from './role.entity';
import { NoticeEntity } from './notice.entity';
import { TeamEntity } from './team.entity';
import { EditHistoryEntity } from './editHistory.entity';
import { CommentEntity } from './comment.entity';
import { OauthEntity } from './oauth.entity';
import { AbstractBaseEntity } from './abstractBase.entity';
import { ExpressionEntity } from './expression.entity';
import { UserProfileImage } from './userProfileImage.entity';

// todo 상수로 테이블 이름 분리하기
@Entity({ name: 'users' })
export class UserEntity extends AbstractBaseEntity {
	@Column({ type: 'varchar', length: 255, name: 'name', nullable: false })
	name: string;

	@Column({ type: 'varchar', length: 255, name: 'email', nullable: false })
	email: string;

	@Column({
		type: 'text',
		name: 'description',
		nullable: false,
	})
	description: string;

	@OneToOne(() => UserSettingEntity, (setting) => setting.user)
	setting: Promise<UserSettingEntity>;

	@OneToOne(() => OauthEntity, (oauth) => oauth.user)
	oauth: OauthEntity;

	@OneToMany(() => NoticeEntity, (notices) => notices.user, {
		eager: false,
	})
	notices: NoticeEntity[];

	@OneToMany(() => EditHistoryEntity, (editHistory) => editHistory.user, {
		eager: false,
	})
	editHistories: EditHistoryEntity[];

	@OneToMany(() => ExpressionEntity, (expresion) => expresion.user, {
		eager: false,
	})
	expressions: ExpressionEntity[];

	// todo add test
	@OneToMany(() => UserProfileImage, (object) => object.user)
	profileImage: UserProfileImage;

	@OneToMany(() => CommentEntity, (comments) => comments.user)
	comments: CommentEntity[];

	@ManyToMany(() => RoleEntity, {
		eager: true,
		cascade: true,
	})
	@JoinTable({
		name: 'user_role',
		joinColumn: {
			name: 'user_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'role_id',
			referencedColumnName: 'id',
		},
	})
	roles: RoleEntity[];

	@ManyToMany(() => TeamEntity, (team) => team.users, {
		eager: false,
	})
	@JoinTable({
		name: 'user_team',
		joinColumn: {
			name: 'user_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'team_id',
			referencedColumnName: 'id',
		},
	})
	teams: TeamEntity[];

	@ManyToMany(() => UserEntity, (object) => object.likeFrom, { eager: false })
	@JoinTable({
		name: 'user_likes',
		joinColumn: {
			name: 'to_user_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'from_user_id',
			referencedColumnName: 'id',
		},
	})
	likeTo: UserEntity[];

	@ManyToMany(() => UserEntity, (object) => object.likeTo)
	@JoinTable({
		name: 'user_likes',
		joinColumn: {
			name: 'from_user_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'to_user_id',
			referencedColumnName: 'id',
		},
	})
	likeFrom: UserEntity[];
}
