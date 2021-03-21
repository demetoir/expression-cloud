import { EntityRepository, Repository } from 'typeorm';
import { UserSetting } from '../model/user-setting';

@EntityRepository(UserSetting)
export class UserSettingRepository extends Repository<UserSetting> {}
