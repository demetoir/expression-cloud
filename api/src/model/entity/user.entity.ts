import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { UserSettingEntity } from './userSetting.entity';
import { RoleEntity } from './role.entity';
import { NoticeEntity } from './notice.entity';
import tableIdType from '../../libs/tableIdTypeResolver';
import { TeamEntity } from './team.entity';
import { EditHistoryEntity } from './editHistory.entity';

@Entity({ name: 'users' })
export class UserEntity {
	@PrimaryGeneratedColumn('increment', { type: tableIdType, name: 'id' })
	id: bigint;

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

	@CreateDateColumn({ type: 'datetime', name: 'created_at', nullable: false })
	createdAt: Date;

	@UpdateDateColumn({ type: 'datetime', name: 'updated_at', nullable: false })
	updatedAt: Date;

	@DeleteDateColumn({
		type: 'datetime',
		name: 'deleted_at',
		nullable: true,
	})
	deletedAt: Date;

	@OneToOne(
		type => UserSettingEntity,
		setting => setting.user,
	)
	setting: Promise<UserSettingEntity>;

	@ManyToMany(type => RoleEntity, {
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

	@OneToMany(
		type => NoticeEntity,
		notices => notices.user,
		{
			eager: false,
		},
	)
	notices: NoticeEntity[];

	@ManyToMany(
		type => TeamEntity,
		team => team.users,
		{
			eager: false,
		},
	)
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
	teams: TeamEntity;

	@OneToMany(
		type => EditHistoryEntity,
		editHistory => editHistory.user,
	)
	editHistories: EditHistoryEntity[];
}
