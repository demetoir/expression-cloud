import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JWTConfigService } from './jwt-config.service';
import { AccessJwtConfigService } from './access-jwt-config.service';
import { RefreshJwtConfigService } from './refresh-jwt-config.service';

@Module({
	imports: [ConfigModule],
	providers: [
		JWTConfigService,
		AccessJwtConfigService,
		RefreshJwtConfigService,
	],
	exports: [
		JWTConfigService,
		AccessJwtConfigService,
		RefreshJwtConfigService,
	],
})
export class JwtConfigModule {}
