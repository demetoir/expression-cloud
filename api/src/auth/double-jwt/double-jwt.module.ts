import { Module } from '@nestjs/common';
import { JwtWrapperModule, JwtWrapperOptionService } from './jwt-wrapper';
import { DoubleJwtService } from './double-jwt.service';

@Module({
	imports: [
		JwtWrapperModule.registerAsync({
			useClass: JwtWrapperOptionService,
		}),
	],
	providers: [DoubleJwtService],
	exports: [DoubleJwtService],
})
export class DoubleJwtModule {}
