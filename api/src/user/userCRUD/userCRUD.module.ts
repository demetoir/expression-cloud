import { Module } from '@nestjs/common';
import { UserCRUDController } from './userCRUD.controller';
import { UserCRUDService } from './userCRUD.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../common/model/entity/user.entity';
import { UserRepository } from '../user.repository';

@Module({
	imports: [
		// DatabaseModule,
		// TypeOrmModule.forRoot(ormConfig),
		TypeOrmModule.forFeature([UserEntity, UserRepository]),
	],
	controllers: [UserCRUDController],
	providers: [UserCRUDService],
})
export class UserCRUDModule {}
