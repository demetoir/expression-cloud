import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './token.service';
import { JWTConfigService } from '../../../global/config/jwt-config';

@Module({
	imports: [JwtModule.register({}), ConfigModule],
	providers: [TokenService, JWTConfigService],
	exports: [TokenService],
})
export class TokenModule {}
