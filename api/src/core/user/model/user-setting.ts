import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { InputType, ObjectType } from '@nestjs/graphql';
import {
	CreatedAtColumn,
	DateTimeField,
	DeletedAtColumn,
	FKColumn,
	IdField,
	IntField,
	PkColumn,
	UpdatedAtColumn,
} from 'src/common';
import { User } from './user';

export const GQL_OBJECT_TYPE_USER_SETTING = 'UserSetting';
export const GQL_INPUT_TYPE_USER_SETTING = 'UserSettingInput';

@InputType(GQL_INPUT_TYPE_USER_SETTING)
@ObjectType(GQL_OBJECT_TYPE_USER_SETTING)
@Entity({ name: 'user_setting' })
export class UserSetting {
	@IdField()
	@PkColumn()
	id: number;

	@DateTimeField()
	@CreatedAtColumn()
	createdAt: Date;

	@DateTimeField()
	@UpdatedAtColumn()
	updatedAt: Date;

	@DateTimeField()
	@DeletedAtColumn()
	deletedAt: Date;

	@IntField()
	@FKColumn({ nullable: true })
	userId: number;

	@OneToOne(() => User, (user) => user.setting)
	@JoinColumn({ name: 'userId', referencedColumnName: 'id' })
	user: User;
}
