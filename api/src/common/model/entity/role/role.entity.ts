import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { BaseEntity } from '../base/base.entity';

@Entity({ name: 'roles' })
export class RoleEntity extends BaseEntity {
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
