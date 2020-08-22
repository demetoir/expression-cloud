import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { BaseEntity } from '../base/base.entity';
import { IUserSetting } from './user-setting.interface';

@Entity({ name: 'user_settings' })
export class UserSettingEntity extends BaseEntity implements IUserSetting {
	// todo user setting 넣을 컬럼 정보 생각하기

	@OneToOne(() => UserEntity, (user) => user.setting)
	@JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
	user: UserEntity;
}
