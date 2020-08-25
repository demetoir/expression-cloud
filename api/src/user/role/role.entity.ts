import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { IRole } from './role.interface';
import { BaseEntity } from '../../common/model/entity/base/base.entity';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'roles' })
export class RoleEntity extends BaseEntity implements IRole {
	@Column({ type: 'varchar', length: 255, name: 'name', nullable: false })
	name: string;

	@ManyToMany(() => UserEntity)
	@JoinTable({
		name: 'user_role',
		joinColumn: {
			name: 'role_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'user_id',
			referencedColumnName: 'id',
		},
	})
	users: UserEntity[];
}