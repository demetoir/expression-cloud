import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { DoubleJwtService } from './double-jwt.service';
import { JwtOptionService } from './jwt-option.service';
import { JwtPassportModule } from './strategy/jwtPassport.module';

@Module({
	imports: [
		JwtPassportModule,
		JwtModule.registerAsync({
			useClass: JwtOptionService,
		}),
	],
	providers: [JwtOptionService, DoubleJwtService],
	exports: [DoubleJwtService],
})
export class DoubleJwtModule {}
