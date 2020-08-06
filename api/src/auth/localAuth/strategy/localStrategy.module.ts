import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';

@Module({
	imports: [PassportModule],
	providers: [LocalStrategy],
})
export class LocalStrategyModule {}
