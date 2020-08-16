import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { DoubleJwtService } from './double-jwt.service';
import { JwtStrategy } from './strategy/JWT.strategy';
import { JwtOptionService } from './jwt-option.service';

@Module({
	imports: [
		PassportModule,
		JwtModule.registerAsync({
			useClass: JwtOptionService,
		}),
	],
	providers: [JwtOptionService, JwtStrategy, DoubleJwtService],
	exports: [DoubleJwtService],
})
export class DoubleJwtModule {}
