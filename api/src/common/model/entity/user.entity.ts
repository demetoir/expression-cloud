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
import { UserProfileImageEntity } from './userProfileImage.entity';
import { ApiProperty } from '@nestjs/swagger';

// todo 상수로 테이블 이름 분리하기
@Entity({ name: 'users' })
export class UserEntity extends AbstractBaseEntity {
	@ApiProperty({
		required: false,
	})
	@Column({
		name: 'name',
		type: 'varchar',
		length: 255,
		nullable: false,
	})
	name: string;

	@ApiProperty()
	@Column({
		name: 'email',
		type: 'varchar',
		length: 255,
		nullable: true,
		default: null,
	})
	email: string;

	@ApiProperty()
	@Column({
		name: 'description',
		type: 'text',
		nullable: true,
		default: null,
	})
	description: string;

	@ApiProperty()
	@Column({
		name: 'is_anonymous',
		type: 'boolean',
		nullable: false,
		default: false,
	})
	isAnonymous: boolean;

	@ApiProperty()
	@Column({
		name: 'liked_count',
		type: 'integer',
		nullable: false,
		default: 0,
	})
	likedCount: number;

	@ApiProperty()
	@Column({
		name: 'forked_count',
		type: 'integer',
		nullable: false,
		default: 0,
	})
	forkedCount: number;

	@ApiProperty()
	@OneToOne(() => UserSettingEntity, (setting) => setting.user)
	setting: Promise<UserSettingEntity>;

	@ApiProperty()
	@OneToOne(() => OauthEntity, (oauth) => oauth.user)
	oauth: OauthEntity;

	@ApiProperty()
	@OneToMany(() => NoticeEntity, (notices) => notices.user, {
		eager: false,
	})
	notices: NoticeEntity[];

	@ApiProperty()
	@OneToMany(() => EditHistoryEntity, (editHistory) => editHistory.user, {
		eager: false,
	})
	editHistories: EditHistoryEntity[];

	@ApiProperty()
	@OneToMany(() => ExpressionEntity, (expresion) => expresion.user, {
		eager: false,
	})
	expressions: ExpressionEntity[];

	@ApiProperty()
	@OneToOne(() => UserProfileImageEntity, (object) => object.user)
	profileImage: UserProfileImageEntity;

	@ApiProperty()
	@OneToMany(() => CommentEntity, (comments) => comments.user)
	comments: CommentEntity[];

	@ApiProperty()
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

	@ApiProperty()
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

	@ManyToMany(() => UserEntity, (object) => object.likeFromUsers, {
		eager: false,
	})
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
	likeToUsers: UserEntity[];

	@ManyToMany(() => UserEntity, (object) => object.likeToUsers)
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
	likeFromUsers: UserEntity[];

	@ManyToMany(() => ExpressionEntity, (expression) => expression.likeFrom)
	@JoinTable({
		name: 'expression_likes',
		joinColumn: {
			name: 'from_user_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'to_expression_id',
			referencedColumnName: 'id',
		},
	})
	likeToExpressions: ExpressionEntity[];
}
