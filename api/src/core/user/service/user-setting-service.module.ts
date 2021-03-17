import { Module } from '@nestjs/common';
import { UserSettingService } from './user-setting.service';
import { UserSettingRepositoryModule } from '../repository';

@Module({
	imports: [UserSettingRepositoryModule],
	providers: [UserSettingService],
	exports: [UserSettingService],
})
export class UserSettingServiceModule {}
