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
import { ProjectEntity } from './project.entity';
import { LikeEntity } from './like.entity';
import { CommentEntity } from './comment.entity';
import { OauthEntity } from './oauth.entity';
import { AbstractBaseEntity } from './abstractBase.entity';

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

	// todo 여기 순서 정리하기
	@OneToOne(() => UserSettingEntity, (setting) => setting.user)
	setting: Promise<UserSettingEntity>;

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

	@OneToMany(() => NoticeEntity, (notices) => notices.user, {
		eager: false,
	})
	notices: NoticeEntity[];

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

	@OneToMany(() => EditHistoryEntity, (editHistory) => editHistory.user, {
		eager: false,
	})
	editHistories: EditHistoryEntity[];

	@OneToMany(() => ProjectEntity, (project) => project.user, { eager: false })
	projects: ProjectEntity[];

	@OneToMany(() => LikeEntity, (likes) => likes.user)
	likes: LikeEntity[];

	@OneToMany(() => CommentEntity, (comments) => comments.user)
	comments: CommentEntity[];

	@OneToOne(() => OauthEntity, (oauth) => oauth.user)
	oauth: OauthEntity;
}
