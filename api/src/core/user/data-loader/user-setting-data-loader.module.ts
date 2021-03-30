import { Module } from '@nestjs/common';
import { UserSettingServiceModule } from '../service';
import { UserSettingDataLoader } from './user-setting.data-loader';

@Module({
	imports: [UserSettingServiceModule],
	providers: [UserSettingDataLoader],
	exports: [UserSettingDataLoader],
})
export class UserSettingDataLoaderModule {}
