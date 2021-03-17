import { Module } from '@nestjs/common';
import { UserOauthController } from 'src/user/user-oauth/user-oauth.controller';
import { UserOauthService } from 'src/user/user-oauth/user-oauth.service';

@Module({
	controllers: [UserOauthController],
	providers: [UserOauthService],
})
export class UserOauthModule {}
