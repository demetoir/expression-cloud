import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLikeEntity } from 'src/user-like/user-like.entity';

@Module({
	imports: [TypeOrmModule.forFeature([UserLikeEntity])],
})
export class UserLikeModule {}
