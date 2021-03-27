import { Entity, OneToMany, OneToOne } from 'typeorm';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
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
import { Expression } from 'src/core/equation/expression';
import { UserSetting } from './user-setting';
import { UserLike } from './user-like';

export const GQL_INPUT_TYPE_USER = 'UserInput';
export const GQL_OBJECT_TYPE_USER = 'User';

@InputType(GQL_INPUT_TYPE_USER)
@ObjectType(GQL_OBJECT_TYPE_USER)
@Entity({ name: 'user' })
export class User {
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
	@VarcharColumn()
	name: string;

	@StringField()
	@VarcharColumn({
		nullable: true,
		default: null,
		unique: true,
	})
	email?: string;

	@StringField()
	@TextColumn({
		nullable: true,
		default: null,
	})
	description?: string;

	@BooleanField()
	@BooleanColumn({
		default: false,
	})
	isAnonymous: boolean;

	@IntField()
	@IntColumn({
		default: 0,
	})
	likedCount: number;

	@IntField()
	@IntColumn({
		default: 0,
	})
	forkedCount: number;

	// relation
	@Field(() => UserSetting)
	@OneToOne(() => UserSetting, (setting) => setting.user)
	setting: Promise<UserSetting>;

	@Field(() => [Expression])
	@OneToMany(() => Expression, (expression) => expression.owner)
	expressions: Expression;

	@OneToMany(() => UserLike, (object) => object.toUser)
	likeUsers: UserLike[];

	@OneToMany(() => UserLike, (object) => object.fromUser)
	likeFromUsers: UserLike[];
}
