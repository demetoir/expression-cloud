import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/core/user/model/user';
import { UserRepository } from './user.repository';

@Module({
	imports: [TypeOrmModule.forFeature([User, UserRepository])],
	exports: [TypeOrmModule],
})
export class UserRepositoryModule {}
