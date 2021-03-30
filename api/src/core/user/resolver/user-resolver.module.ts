import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserServiceModule } from '../service';
import { UserSettingDataLoaderModule } from '../data-loader';

@Module({
	imports: [UserServiceModule, UserSettingDataLoaderModule],
	providers: [UserResolver],
})
export class UserResolverModule {}
