import { Module } from '@nestjs/common';
import { TokenService } from './Token.service';
import { JwtModule } from '@nestjs/jwt';
import { JWTOptionService } from '../config/JWTOption.service';

@Module({
	imports: [
		JwtModule.registerAsync({
			useClass: JWTOptionService,
		}),
	],
	providers: [TokenService],
	exports: [TokenService],
})
export class TokenModule {}
