import { BeforeInsert, Entity, ManyToOne, OneToMany } from 'typeorm';
import {
	BooleanColumn,
	BooleanField,
	CreatedAtColumn,
	DateTimeField,
	DeletedAtColumn,
	IdField,
	IntColumn,
	IntField,
	PkColumn,
	StringField,
	TextColumn,
	UpdatedAtColumn,
	VarcharColumn,
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
	@IntColumn()
	type: number;

	@StringField()
	@VarcharColumn()
	name: string;

	@StringField()
	@TextColumn()
	content: string;

	@StringField()
	@TextColumn()
	description: string;

	@IntField()
	@IntColumn()
	likeCount: number;

	@BooleanField()
	@BooleanColumn()
	isForked: boolean;

	@IntField()
	@IntColumn()
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

	@BeforeInsert()
	beforeInsert(): void {
		this.likeCount = 0;
		this.isForked = false;
		this.forkCount = 0;
	}
}
