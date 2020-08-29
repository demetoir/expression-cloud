import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	OneToMany,
	OneToOne,
} from 'typeorm';
import { NoticeEntity } from '../../notice/notice.entity';
import { TeamEntity } from '../../team/team.entity';
import { EditHistoryEntity } from '../../history/edit-history.entity';
import { CommentEntity } from '../../comment/comment.entity';
import { UserOauthEntity } from '../user-oauth/user-oauth.entity';
import { ExpressionEntity } from '../../expression/expression/expression.entity';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/model/entity/base/base.entity';
import { UserSettingEntity } from '../user-setting/user-setting.entity';
import { IUser } from './user.interface';
import { UserProfileImageEntity } from '../user-profile-image/user-profile-image.entity';
import { RoleEntity } from '../role/role.entity';

// todo 상수로 테이블 이름 분리하기
// todo: 엔티티 클래스에 너무 많은 엔티가 붙는다
//   이거를 3단계로 상속 받아서 처리하면 어떨지 생각해야한다
//   예를들어 기본적인 typeorm entity decorator 있는놈을 상속받은 놈에서
//   class-validation 추가하고 또 상속한뒤 swagger decorator를 추가한다
//   그리고 이놈들은 모두 폴더 한단계 파서 몰아넣고 최송 자식만을 익스포트 해버리면 되지 않을까?
//   적어도 이렇게 하면 관심사가  데코레이터별로 나누어진다는 장점이 있다.
//   그렇지만 상속 관계를 이용해서 구현했기 때문에 종속성이 생기고, 프로퍼티 세이프 하지 않음...
//   safe하게 하려면 각 클래스마다 제대로 상속 받았는지 property 검사하도록 테스트 작성하면 된다
//
@Entity({ name: 'users' })
export class UserEntity extends BaseEntity implements IUser {
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
		unique: true,
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
	@OneToOne(() => UserOauthEntity, (oauth) => oauth.user)
	oauth: UserOauthEntity;

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
		eager: false,
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
	@ManyToMany(() => TeamEntity, (team) => team.users)
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

	@ManyToMany(() => ExpressionEntity, (expression) => expression.likeFrom, {
		eager: false,
	})
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
