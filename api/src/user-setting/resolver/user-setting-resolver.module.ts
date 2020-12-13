import { Module } from '@nestjs/common';
import { UserSettingResolver } from 'src/user-setting/resolver/user-setting.resolver';
import { UserSettingService } from 'src/user-setting/service';

@Module({
	imports: [UserSettingService],
	providers: [UserSettingResolver],
})
export class UserSettingResolverModule {}
