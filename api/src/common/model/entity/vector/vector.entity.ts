import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ExpressionEntity } from '../expression/expression.entity';
import { ScalarEntity } from '../scalar/scalar.entity';
import { BaseEntity } from '../base/base.entity';

@Entity({ name: 'vectors' })
export class VectorEntity extends BaseEntity {
	@Column({
		name: 'name',
		type: 'varchar',
		length: 255,
		nullable: false,
	})
	name: string;

	@Column({ name: 'index', type: 'int', nullable: false })
	index: number;

	@OneToMany(() => ScalarEntity, (scalars) => scalars.vector)
	scalars: ScalarEntity[];

	@ManyToOne(() => ExpressionEntity, (expression) => expression.vectors)
	@JoinColumn({ name: 'expression_id', referencedColumnName: 'id' })
	expression: ExpressionEntity;
}