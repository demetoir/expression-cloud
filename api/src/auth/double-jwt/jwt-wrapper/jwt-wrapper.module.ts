import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { JwtWrapperService } from './jwt-wrapper.service';
import { JwtWrapperOptionService } from './jwt-wrapper-option.service';

@Module({
	imports: [
		JwtModule.registerAsync({
			useClass: JwtWrapperOptionService,
		}),
	],
	providers: [JwtWrapperOptionService, JwtWrapperService],
	exports: [JwtWrapperService],
})
export class JwtWrapperModule {}
