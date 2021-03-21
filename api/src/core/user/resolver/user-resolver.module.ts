import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserServiceModule } from '../service/user-service.module';
import { UserSettingDataLoaderModule } from '../loader';

@Module({
	imports: [UserServiceModule, UserSettingDataLoaderModule],
	providers: [UserResolver],
})
export class UserResolverModule {}
