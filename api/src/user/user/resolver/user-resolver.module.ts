import { Module } from '@nestjs/common';
import { UserSettingDataLoaderModule } from 'src/user/user-setting';
import { UserServiceModule } from '../service';
import { UserResolver } from './user.resolver';

@Module({
	imports: [UserServiceModule, UserSettingDataLoaderModule],
	providers: [UserResolver],
})
export class UserResolverModule {}
