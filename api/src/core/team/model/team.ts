import { Column, Entity } from 'typeorm';

@Entity({ name: 'teams' })
export class Team {
	@Column({ type: 'varchar', length: 255, name: 'name', nullable: false })
	name: string;

	@Column({ type: 'text', name: 'description', nullable: false })
	description: string;
}
