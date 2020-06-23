import { Column, Entity } from 'typeorm';
import { AbstractBaseEntity } from './abstractBase.entity';

@Entity({ name: 'edit_history_value_bigints' })
export class EditHistoryValueVarcharEntity extends AbstractBaseEntity {
	@Column({ name: 'value', type: 'bigint', nullable: false })
	value: bigint;

	// todo add edit history  relaction one to one
}
