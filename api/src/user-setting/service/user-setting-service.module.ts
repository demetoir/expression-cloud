import { Module } from '@nestjs/common';
import { UserSettingService } from './user-setting.service';

@Module({
	providers: [UserSettingService],
	exports: [UserSettingService],
})
export class UserSettingServiceModule {}
