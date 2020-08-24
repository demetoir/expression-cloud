import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { UserEntity } from '../common/model/entity/user/user.entity';
import { BaseEntity } from '../common/model/entity/base/base.entity';
import { ITeam } from './team.interface';

@Entity({ name: 'teams' })
export class TeamEntity extends BaseEntity implements ITeam {
	@Column({ type: 'varchar', length: 255, name: 'name', nullable: false })
	name: string;

	@Column({ type: 'text', name: 'description', nullable: false })
	description: string;

	@ManyToMany(() => UserEntity, (user) => user.teams)
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
	users: UserEntity[];
}
