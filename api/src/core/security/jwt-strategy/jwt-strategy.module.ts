import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthServiceModule } from '../auth';
import { JwtStrategy } from './jwt.strategy';
import { JwtConfigModule } from '../../../global/config/jwt-config';

@Module({
	imports: [PassportModule, AuthServiceModule, JwtConfigModule],
	providers: [JwtStrategy],
})
export class JwtStrategyModule {}
