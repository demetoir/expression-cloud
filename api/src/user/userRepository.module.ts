import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../common/model/entity/user.entity';

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity])],
	exports: [TypeOrmModule],
})
export class UserRepositoryModule {}
