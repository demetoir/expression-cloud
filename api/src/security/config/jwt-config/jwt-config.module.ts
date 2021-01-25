import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JWTConfigService } from './jwt-config.service';

@Module({
	imports: [ConfigModule],
	providers: [JWTConfigService],
	exports: [JWTConfigService],
})
export class JwtConfigModule {}
