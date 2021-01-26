import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtConfigModule } from 'src/security/config';
import { AuthServiceModule } from '../auth';
import { JwtStrategy } from './jwt.strategy';

@Module({
	imports: [PassportModule, AuthServiceModule, JwtConfigModule],
	providers: [JwtStrategy],
})
export class JwtStrategyModule {}
