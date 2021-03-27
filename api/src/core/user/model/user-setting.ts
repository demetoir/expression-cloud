import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { InputType, ObjectType } from '@nestjs/graphql';
import {
	CreatedAtColumn,
	CreatedAtField,
	DateTimeField,
	DeletedAtColumn,
	DeletedAtField,
	FKColumn,
	IdField,
	IntField,
	PkColumn,
	UpdatedAtColumn,
	UpdatedAtField,
} from 'src/common';
import { User } from './user';

export const GQL_OBJECT_TYPE_USER_SETTING = 'UserSetting';
export const GQL_INPUT_TYPE_USER_SETTING = 'UserSettingInput';

@InputType(GQL_INPUT_TYPE_USER_SETTING)
@ObjectType(GQL_OBJECT_TYPE_USER_SETTING)
@Entity()
export class UserSetting {
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

	@IntField()
	@FKColumn({ nullable: true })
	userId: number;

	@OneToOne(() => User, (user) => user.setting)
	@JoinColumn({ name: 'userId' })
	user: User;
}
