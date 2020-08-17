import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { DoubleJwtService } from './double-jwt.service';
import { DoubleJwtOptionService } from './jwt-option.service';
import { JwtPassportModule } from './strategy/jwtPassport.module';

@Module({
	imports: [
		JwtPassportModule,
		JwtModule.registerAsync({
			useClass: DoubleJwtOptionService,
		}),
	],
	providers: [DoubleJwtOptionService, DoubleJwtService],
	exports: [DoubleJwtService],
})
export class DoubleJwtModule {}
