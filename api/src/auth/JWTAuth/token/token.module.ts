import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JWTOptionService } from '../config/JWTOption.service';
import { TokenService } from './token.service';

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
