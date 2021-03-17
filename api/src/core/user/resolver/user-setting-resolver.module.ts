import { Module } from '@nestjs/common';
import { UserSettingResolver } from 'src/core/user/resolver/user-setting.resolver';
import { UserSettingServiceModule } from 'src/core/user/service';

@Module({
	imports: [UserSettingServiceModule],
	providers: [UserSettingResolver],
})
export class UserSettingResolverModule {}
