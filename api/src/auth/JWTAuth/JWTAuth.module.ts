import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { JWTOptionService } from './config/JWTOption.service';
import { TokenModule } from './token/token.module';
import { JWTAuthService } from './JWTAuth.service';
import { JWTStrategy } from './strategy/JWT.strategy';

@Module({
	imports: [
		PassportModule,
		JwtModule.registerAsync({
			useClass: JWTOptionService,
		}),
		TokenModule,
	],
	providers: [JWTOptionService, JWTStrategy, JWTAuthService],
	exports: [JWTAuthService],
})
export class JWTAuthModule {}
