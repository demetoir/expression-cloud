import { Module } from '@nestjs/common';
import { UserSettingModule } from '../user-setting.module';
import { UserSettingService } from './user-setting.service';

@Module({
	imports: [UserSettingModule],
	providers: [UserSettingService],
	exports: [UserSettingService],
})
export class UserSettingServiceModule {}
