import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import {
	CreatedAtColumn,
	CreatedAtField,
	DateTimeField,
	DeletedAtColumn,
	DeletedAtField,
	IdField,
	IntColumn,
	IntField,
	PkColumn,
	StringField,
	UpdatedAtColumn,
	UpdatedAtField,
	VarcharColumn,
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

	@CreatedAtField()
	@CreatedAtColumn()
	createdAt: Date;

	@UpdatedAtField()
	@UpdatedAtColumn()
	updatedAt: Date;

	@DeletedAtField()
	@DeletedAtColumn()
	deletedAt: Date;

	@StringField()
	@VarcharColumn()
	name: string;

	@IntField()
	@IntColumn()
	index: number;

	// @OneToMany(() => ScalarEntity, (scalars) => scalars.vector)
	// scalars: ScalarEntity[];

	@Field(() => Expression)
	@ManyToOne(() => Expression, (expression) => expression.vectors)
	@JoinColumn({ name: 'expression_id', referencedColumnName: 'id' })
	expression: Expression;
}
