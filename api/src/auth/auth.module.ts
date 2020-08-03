import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt/jwtEnv';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
	imports: [
		PassportModule,
		JwtModule.register({
			secret: jwtConstants.secret,
			signOptions: { expiresIn: '60h' },
		}),
	],
	providers: [AuthService, LocalStrategy, JwtStrategy],
	controllers: [AuthController],
})
export class AuthModule {}
