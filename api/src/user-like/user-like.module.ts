import { Module } from '@nestjs/common';
import { UserLikeController } from 'src/user-like/user-like.controller';
import { UserLikeService } from 'src/user-like/user-like.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLikeEntity } from 'src/user-like/user-like.entity';

@Module({
	imports: [TypeOrmModule.forFeature([UserLikeEntity])],
	controllers: [UserLikeController],
	providers: [UserLikeService],
})
export class UserLikeModule {}
