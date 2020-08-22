import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity({ name: 'edit_history_value_bigints' })
export class EditHistoryValueVarcharEntity extends BaseEntity {
	@Column({ name: 'value', type: 'bigint', nullable: false })
	value: bigint;

	// todo add edit history  relaction one to one
}
