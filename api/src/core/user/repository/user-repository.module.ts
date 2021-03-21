import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User, UserSetting } from '../model';
import { UserSettingRepository } from './user-setting.repository';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			User,
			UserRepository,
			UserSetting,
			UserSettingRepository,
		]),
	],
	exports: [TypeOrmModule],
})
export class UserRepositoryModule {}
