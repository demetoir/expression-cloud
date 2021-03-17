import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { InputType, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/user';
import {
	CreatedAtColumn,
	DateTimeField,
	DeletedAtColumn,
	FKColumn,
	IdColumn,
	IdField,
	IntField,
	UpdatedAtColumn,
} from 'src/common';

export const GQL_OBJECT_TYPE_USER_SETTING = 'UserSetting';
export const GQL_INPUT_TYPE_USER_SETTING = 'UserSettingInput';

@InputType(GQL_INPUT_TYPE_USER_SETTING)
@ObjectType(GQL_OBJECT_TYPE_USER_SETTING)
@Entity({ name: 'user_setting' })
export class UserSetting {
	@IdField()
	@IdColumn()
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
	@FKColumn({ name: 'user_id' })
	userId: number;

	@OneToOne(() => User, (user) => user.setting)
	@JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
	user: User;
}
