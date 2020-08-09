import { Module } from '@nestjs/common';
import { UserCRUDController } from './userCRUD.controller';
import { UserCRUDService } from './userCRUD.service';
import { UserRepositoryModule } from '../userRepository/userRepository.module';

@Module({
	imports: [UserRepositoryModule],
	controllers: [UserCRUDController],
	providers: [UserCRUDService],
})
export class UserCRUDModule {}
