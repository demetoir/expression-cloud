import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { DoubleJwtService } from './double-jwt.service';
import { JwtPassportModule } from './strategy/jwtPassport.module';
import { DoubleJwtOptionService } from './double-jwt-option.service';

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
