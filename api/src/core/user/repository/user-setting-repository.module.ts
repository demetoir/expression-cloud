import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSettingRepository } from './user-setting.repository';
import { UserSetting } from '../model/user-setting';

@Module({
	imports: [TypeOrmModule.forFeature([UserSetting, UserSettingRepository])],
	exports: [TypeOrmModule],
})
export class UserSettingRepositoryModule {}
