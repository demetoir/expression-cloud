import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JWTOptionService } from './config/JWTOption.service';
import { JWTStrategy } from './strategy/jwt.strategy';
import { JWTAuthService } from './JWTAuth.service';
import { TokenModule } from './token/Token.module';

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
