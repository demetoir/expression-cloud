import { Entity, OneToMany, OneToOne } from 'typeorm';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
	CreatedAtColumn,
	CreatedAtField,
	DeletedAtColumn,
	DeletedAtField,
	IdField,
	PkColumn,
	UpdatedAtColumn,
	UpdatedAtField,
} from 'src/common';
import { Expression } from 'src/core/equation/expression';
import { UserSetting } from './user-setting';
import { UserLike } from './user-like';
import { UserDetail } from './user-detail';

export const GQL_INPUT_TYPE_USER = 'UserInput';
export const GQL_OBJECT_TYPE_USER = 'User';

@InputType(GQL_INPUT_TYPE_USER)
@ObjectType(GQL_OBJECT_TYPE_USER)
@Entity()
export class User {
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

	@Field(() => UserDetail, { nullable: true })
	@OneToOne(() => UserDetail, (object) => object.user)
	detail: UserDetail;

	// relation
	@Field(() => UserSetting)
	@OneToOne(() => UserSetting, (object) => object.user)
	setting: Promise<UserSetting>;

	@Field(() => [Expression])
	@OneToMany(() => Expression, (object) => object.owner)
	expressions: Expression;

	@OneToMany(() => UserLike, (object) => object.toUser)
	likeUsers: UserLike[];

	@OneToMany(() => UserLike, (object) => object.fromUser)
	likeFromUsers: UserLike[];
}
