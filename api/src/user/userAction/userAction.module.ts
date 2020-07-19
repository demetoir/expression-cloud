import { Module } from '@nestjs/common';
import { UserActionController } from './userAction.controller';
import { UserActionService } from './userAction.service';

@Module({
	controllers: [UserActionController],
	providers: [UserActionService],
})
export class UserActionModule {}
