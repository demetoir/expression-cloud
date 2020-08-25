import { Module } from '@nestjs/common';
import { UserLikeController } from './user-like.controller';
import { UserLikeService } from './user-like.service';

@Module({
	controllers: [UserLikeController],
	providers: [UserLikeService],
})
export class UserLikeModule {}
