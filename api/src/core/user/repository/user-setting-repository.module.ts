import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSettingRepository } from './user-setting.repository';
import { User, UserSetting } from '../model';
import { UserRepository } from './user.repository';

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
export class UserSettingRepositoryModule {}
