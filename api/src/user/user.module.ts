import { Module } from '@nestjs/common';
import { UserActionModule } from './userAction/userAction.module';
import { UserCRUDService } from './userCRUD/userCRUD.service';
import { UserSettingModule } from './userSetting/userSetting.module';

@Module({
	imports: [UserActionModule, UserCRUDService, UserSettingModule],
})
export class UserModule {}
