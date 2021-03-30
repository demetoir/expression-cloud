import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from '../model';

@Module({
	imports: [TypeOrmModule.forFeature([User, UserRepository])],
	exports: [TypeOrmModule],
})
export class UserRepositoryModule {}
