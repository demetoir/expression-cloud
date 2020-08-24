import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../common/model/entity/base/base.entity';

@Entity({ name: 'edit_history_value_varchars' })
export class EditHistoryValueVarcharEntity extends BaseEntity {
	@Column({ name: 'value', type: 'varchar', length: 255, nullable: false })
	value: string;

	// todo add edit history  relaction one to one
}
