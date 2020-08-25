import { Module } from '@nestjs/common';
import { UserLikeController } from './user-like.controller';
import { UserLikeService } from './user-like.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLikeEntity } from './user-like.entity';

@Module({
	imports: [TypeOrmModule.forFeature([UserLikeEntity])],
	controllers: [UserLikeController],
	providers: [UserLikeService],
})
export class UserLikeModule {}
