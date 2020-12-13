import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { User } from 'src/user/model/user.entity';
import { BaseEntity } from '../common/model/entity/base/base.entity';

@Entity({ name: 'teams' })
export class TeamEntity extends BaseEntity {
	@Column({ type: 'varchar', length: 255, name: 'name', nullable: false })
	name: string;

	@Column({ type: 'text', name: 'description', nullable: false })
	description: string;

	@ManyToMany(() => User, (user) => user.teams)
	@JoinTable({
		name: 'user_team',
		joinColumn: {
			name: 'team_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'user_id',
			referencedColumnName: 'id',
		},
	})
	users: User[];
}
