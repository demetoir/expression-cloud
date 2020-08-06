import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JWTOptionService } from './strategy/JWTOption.service';
import { JWTStrategy } from './strategy/jwt.strategy';
import { JWTAuthService } from './JWTAuth.service';
import { TokenService } from './token/Token.service';

@Module({
	imports: [
		PassportModule,
		JwtModule.registerAsync({
			useClass: JWTOptionService,
		}),
	],
	providers: [JWTOptionService, JWTStrategy, JWTAuthService, TokenService],
	exports: [
		JwtModule.registerAsync({
			useClass: JWTOptionService,
		}),
		JWTAuthService,
	],
})
export class JWTAuthModule {}
