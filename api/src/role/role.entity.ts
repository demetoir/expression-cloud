import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from 'src/common/model/entity/base/base.entity';
import { UserEntity } from 'src/user/model/user.entity';
import { RoleEnum } from 'src/role/role.enum';

@Entity({ name: 'roles' })
export class RoleEntity extends BaseEntity {
	@Column({ type: 'varchar', length: 10, name: 'name', nullable: false })
	name: RoleEnum;

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
