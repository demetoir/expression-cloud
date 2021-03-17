import { Module } from '@nestjs/common';
import { UserSettingResolver } from 'src/user/user-setting/resolver/user-setting.resolver';
import { UserSettingServiceModule } from 'src/user/user-setting/service';

@Module({
	imports: [UserSettingServiceModule],
	providers: [UserSettingResolver],
})
export class UserSettingResolverModule {}
