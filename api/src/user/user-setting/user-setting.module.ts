import { Module } from '@nestjs/common';
import { UserSettingController } from './user-setting.controller';
import { UserSettingService } from './user-setting.service';

@Module({
	controllers: [UserSettingController],
	providers: [UserSettingService],
})
export class UserSettingModule {}
