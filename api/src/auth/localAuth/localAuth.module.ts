import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { LocalAuthService } from './localAuth.service';

@Module({
	imports: [PassportModule],
	providers: [LocalStrategy, LocalAuthService],
	exports: [LocalAuthService],
})
export class LocalAuthModule {}
