import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './token.service';
import {
	JwtConfigModule,
	JWTConfigService,
} from '../../../global/config/jwt-config';

@Module({
	imports: [JwtModule.register({}), JwtConfigModule],
	providers: [TokenService, JWTConfigService],
	exports: [TokenService],
})
export class TokenModule {}
