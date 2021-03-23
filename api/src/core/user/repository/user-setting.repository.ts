import { EntityRepository, Repository } from 'typeorm';
import { UserSetting } from '../model';

@EntityRepository(UserSetting)
export class UserSettingRepository extends Repository<UserSetting> {
	async findByUserIds() {}
}
