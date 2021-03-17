import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import {
	CreatedAtColumn,
	DateTimeField,
	DeletedAtColumn,
	IdField,
	IntField,
	PkColumn,
	StringField,
	UpdatedAtColumn,
} from 'src/common';
import { Expression } from '../../expression';

export const GQL_INPUT_TYPE_VECTOR = 'VectorInput';
export const GQL_OBJECT_TYPE_VECTOR = 'Vector';

@InputType(GQL_INPUT_TYPE_VECTOR)
@ObjectType(GQL_OBJECT_TYPE_VECTOR)
@Entity({ name: 'vector' })
export class Vector {
	@IdField()
	@PkColumn()
	id: number;

	@DateTimeField()
	@CreatedAtColumn()
	createdAt: Date;

	@DateTimeField()
	@UpdatedAtColumn()
	updatedAt: Date;

	@DateTimeField({ nullable: true })
	@DeletedAtColumn()
	deletedAt: Date;

	@StringField()
	@Column({
		name: 'name',
		type: 'varchar',
		length: 255,
		nullable: false,
	})
	name: string;

	@IntField()
	@Column({ name: 'index', type: 'int', nullable: false })
	index: number;

	// @OneToMany(() => ScalarEntity, (scalars) => scalars.vector)
	// scalars: ScalarEntity[];

	@Field(() => Expression)
	@ManyToOne(() => Expression, (expression) => expression.vectors)
	@JoinColumn({ name: 'expression_id', referencedColumnName: 'id' })
	expression: Expression;
}
