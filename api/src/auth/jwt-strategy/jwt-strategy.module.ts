import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { DoubleJwtModule } from 'src/auth/double-jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
	imports: [PassportModule, DoubleJwtModule],
	providers: [JwtStrategy],
})
export class JwtPassportModule {}
