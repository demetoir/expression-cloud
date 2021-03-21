import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import {
	BooleanField,
	CreatedAtColumn,
	DateTimeField,
	DeletedAtColumn,
	IdField,
	IntField,
	PkColumn,
	StringField,
	UpdatedAtColumn,
} from 'src/common';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Vector } from 'src/core/equation/vector/model';
import { User } from '../../../user';

export const GQL_INPUT_TYPE_EXPRESSION = 'ExpresionInput';
export const GQL_OBJECT_TYPE_EXPRESSION = 'Expression';

@InputType(GQL_INPUT_TYPE_EXPRESSION)
@ObjectType(GQL_OBJECT_TYPE_EXPRESSION)
@Entity({ name: 'expression' })
export class Expression {
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

	@IntField()
	@Column({
		name: 'type',
		type: 'tinyint',
		nullable: false,
	})
	type: number;

	@StringField()
	@Column({
		name: 'name',
		type: 'varchar',
		length: 255,
		nullable: false,
	})
	name: string;

	@StringField()
	@Column({
		name: 'content',
		type: 'text',
		nullable: false,
	})
	content: string;

	@StringField()
	@Column({
		name: 'description',
		type: 'text',
		nullable: false,
	})
	description: string;

	@IntField()
	@Column({
		type: 'integer',
		name: 'like_count',
		nullable: false,
		default: 0,
	})
	likeCount: number;

	@BooleanField()
	@Column({
		type: 'boolean',
		name: 'is_forked',
		nullable: false,
		default: false,
	})
	isForked: boolean;

	@IntField()
	@Column({
		type: 'integer',
		name: 'fork_count',
		nullable: false,
		default: 0,
	})
	forkCount: number;

	@Field(() => User)
	@ManyToOne(() => User, (user) => user.expressions)
	owner: User;

	// @OneToMany(() => Expression, (expression) => expression.forkedTo)
	// forkedTo: Expression[];
	//

	@Field(() => [Vector])
	@OneToMany(() => Vector, (vector) => vector.expression)
	vectors: Vector[];

	// @OneToOne(() => ExpressionSettingEntity, (setting) => setting.expression)
	// setting: ExpressionSettingEntity;

	// @OneToMany(() => TagEntity, (tags) => tags.expression)
	// tags: TagEntity[];

	// @OneToOne(
	// 	() => ExpressionThumbnailImageEntity,
	// 	(object) => object.expression,
	// )
	// thumbnailImage: Promise<ExpressionThumbnailImageEntity>;

	// @ManyToOne(() => Expression)
	// @JoinColumn({
	// 	name: 'origin_id',
	// 	referencedColumnName: 'id',
	// })
	// forkedFrom: Expression;
}
