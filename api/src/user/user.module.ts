import { Module } from '@nestjs/common';
import { UserActionModule } from './userAction/userAction.module';
import { UserSettingModule } from './userSetting/userSetting.module';
import { UserCRUDModule } from './userCRUD/userCRUD.module';
import { UserRepositoryModule } from './userRepository/userRepository.module';

@Module({
	imports: [
		UserCRUDModule,
		UserActionModule,
		UserSettingModule,
		UserRepositoryModule,
	],
})
export class UserModule {}
