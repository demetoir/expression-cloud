import { Module } from '@nestjs/common';
import { UserSettingResolver } from 'src/user-setting/resolver/user-setting.resolver';
import { UserSettingServiceModule } from 'src/user-setting/service';

@Module({
	imports: [UserSettingServiceModule],
	providers: [UserSettingResolver],
})
export class UserSettingResolverModule {}
