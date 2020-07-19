import { Module } from '@nestjs/common';
import { UserSettingController } from './userSetting.controller';
import { UserSettingService } from './userSetting.service';

@Module({
	controllers: [UserSettingController],
	providers: [UserSettingService],
})
export class UserSettingModule {}
