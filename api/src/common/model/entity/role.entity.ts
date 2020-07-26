import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { UserEntity } from './user.entity';
import { AbstractBaseEntity } from './abstractBase.entity';

@Entity({ name: 'roles' })
export class RoleEntity extends AbstractBaseEntity {
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
