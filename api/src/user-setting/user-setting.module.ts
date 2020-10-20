import { Module } from '@nestjs/common';
import { UserSettingController } from 'src/user-setting/user-setting.controller';
import { UserSettingService } from 'src/user-setting/user-setting.service';

@Module({
	controllers: [UserSettingController],
	providers: [UserSettingService],
})
export class UserSettingModule {}
