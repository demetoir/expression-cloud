import { Column, Entity } from 'typeorm';
import { RoleName } from 'src/core/user/model/role-name.enum';

@Entity({ name: 'roles' })
export class Role {
	@Column({ type: 'varchar', length: 10, name: 'name', nullable: false })
	name: RoleName;

	// @ManyToMany(() => User)
	// @JoinTable({
	// 	name: 'user_role',
	// 	joinColumn: {
	// 		name: 'role_id',
	// 		referencedColumnName: 'id',
	// 	},
	// 	inverseJoinColumn: {
	// 		name: 'user_id',
	// 		referencedColumnName: 'id',
	// 	},
	// })
	// users: User[];
}
