import { Module } from '@nestjs/common';
import { UserActionModule } from './userAction/userAction.module';
import { UserSettingModule } from './userSetting/userSetting.module';
import { UserCRUDModule } from './userCRUD/userCRUD.module';

@Module({
	imports: [UserActionModule, UserCRUDModule, UserSettingModule],
})
export class UserModule {}
