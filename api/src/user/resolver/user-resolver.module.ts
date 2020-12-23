import { Module } from '@nestjs/common';
import { UserSettingServiceModule } from 'src/user-setting';
import { UserServiceModule } from '../service';
import { UserResolver } from './user.resolver';

@Module({
	imports: [UserServiceModule, UserSettingServiceModule],
	providers: [UserResolver],
})
export class UserResolverModule {}
