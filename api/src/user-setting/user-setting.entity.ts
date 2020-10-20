import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { UserEntity } from 'src/user/user.entity';
import { BaseEntity } from 'src/common/model/entity/base/base.entity';
import { IUserSetting } from 'src/user-setting/user-setting.interface';
import { Column } from 'typeorm';

@Entity({ name: 'user_settings' })
export class UserSettingEntity extends BaseEntity implements IUserSetting {
	// todo user setting 넣을 컬럼 정보 생각하기
	@Column({ name: 'user_id', type: 'bigint', nullable: true })
	userId: number;

	@OneToOne(() => UserEntity, (user) => user.setting)
	@JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
	user: UserEntity;
}
