import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';

@Module({
	imports: [PassportModule],
	providers: [JwtStrategy],
})
export class JwtPassportModule {}
