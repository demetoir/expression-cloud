import { Module } from '@nestjs/common';
import { UserOauthController } from './user-oauth.controller';
import { UserOauthService } from './user-oauth.service';

@Module({
	controllers: [UserOauthController],
	providers: [UserOauthService],
})
export class UserOauthModule {}
