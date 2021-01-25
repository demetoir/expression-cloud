import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JWTConfigService } from 'src/security/config';
import { TokenService } from './token.service';

@Module({
	imports: [JwtModule.register({}), ConfigModule],
	providers: [TokenService, JWTConfigService],
	exports: [TokenService],
})
export class TokenModule {}
