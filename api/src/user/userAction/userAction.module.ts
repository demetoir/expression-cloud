import { Module } from '@nestjs/common';
import { UserActionController } from './userAction.controller';
import { UserActionService } from './userAction.service';
import { UserRepository } from '../userRepository/user.repository';

@Module({
	controllers: [UserActionController],
	providers: [UserActionService, UserRepository],
})
export class UserActionModule {}
