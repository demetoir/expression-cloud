import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	OneToOne,
	ManyToMany,
	JoinTable,
	OneToMany,
} from 'typeorm';
import { UserSettingEntity } from './userSetting.entity';
import { RoleEntity } from './role.entity';
import { type } from 'os';
import { NoticeEntity } from './notices.entity';

@Entity({ name: 'users' })
export class UserEntity {
	@PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id' })
	id: bigint;

	@Column({ type: 'varchar', length: 255, name: 'name', nullable: false })
	name: string;

	@Column({ type: 'varchar', length: 255, name: 'email', nullable: false })
	email: string;

	@Column({
		type: 'varchar',
		length: 255,
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

	@ManyToMany(
		type => RoleEntity, {
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
	)
	notices: NoticeEntity[];
}
