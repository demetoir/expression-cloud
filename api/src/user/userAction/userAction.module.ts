import { Module } from '@nestjs/common';
import { UserActionController } from './userAction.controller';
import { UserActionService } from './userAction.service';
import { UserRepository } from '../userRepository/user.repository';
import { UserRepositoryModule } from '../userRepository/userRepository.module';

@Module({
	imports: [UserRepositoryModule],
	controllers: [UserActionController],
	providers: [UserActionService, UserRepository],
	exports: [UserActionService],
})
export class UserActionModule {}
