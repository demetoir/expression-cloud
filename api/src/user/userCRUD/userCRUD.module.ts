import { Module } from '@nestjs/common';
import { UserCRUDController } from './userCRUD.controller';
import { UserCRUDService } from './userCRUD.service';
import { UserRepositoryModule } from '../userRepository/userRepository.module';
import { UserCRUDChildController } from './userCRUDChild.controller';

@Module({
	imports: [UserRepositoryModule],
	controllers: [UserCRUDController, UserCRUDChildController],
	providers: [UserCRUDService],
})
export class UserCRUDModule {}
