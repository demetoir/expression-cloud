import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
	BooleanColumn,
	BooleanField,
	CreatedAtColumn,
	CreatedAtField,
	DeletedAtColumn,
	DeletedAtField,
	FKColumn,
	IdField,
	IntColumn,
	IntField,
	PkColumn,
	StringField,
	TextColumn,
	UpdatedAtColumn,
	UpdatedAtField,
	VarcharColumn,
} from '../../../common';
import { User } from './user';

@InputType('UserDetailInput')
@ObjectType('UserDetail')
@Entity()
export class UserDetail {
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

	@IdField()
	@FKColumn()
	userId: number;

	@Field(() => User)
	@OneToOne(() => User, (object) => object.detail)
	@JoinColumn({ name: 'userId' })
	user: User;
}
