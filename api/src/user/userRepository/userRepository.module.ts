import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../common/model/entity/user.entity';
import { UserRepository } from './user.repository';

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity, UserRepository])],
	exports: [TypeOrmModule],
})
export class UserRepositoryModule {}