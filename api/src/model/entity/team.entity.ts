import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { UserEntity } from './user.entity';
import { AbstractBaseEntity } from './abstractBase.entity';

@Entity({ name: 'teams' })
export class TeamEntity extends AbstractBaseEntity {
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
