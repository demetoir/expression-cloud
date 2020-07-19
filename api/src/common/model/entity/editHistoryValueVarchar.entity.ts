import { Column, Entity } from 'typeorm';
import { AbstractBaseEntity } from './abstractBase.entity';

@Entity({ name: 'edit_history_value_varchars' })
export class EditHistoryValueVarcharEntity extends AbstractBaseEntity {
	@Column({ name: 'value', type: 'varchar', length: 255, nullable: false })
	value: string;

	// todo add edit history  relaction one to one
}
