import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { CustomJwtService } from './custom-jwt.service';
import { CustomJwtOptionService } from './custom-jwt-option.service';

@Module({
	imports: [
		JwtModule.registerAsync({
			useClass: CustomJwtOptionService,
		}),
	],
	providers: [CustomJwtOptionService, CustomJwtService],
	exports: [CustomJwtService],
})
export class CustomJwtModule {}
