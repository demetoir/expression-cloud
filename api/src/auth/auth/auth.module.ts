import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalAuthModule } from '../localAuth/localAuth.module';
import { User } from '../../user';
import { TokenModule } from '../double-jwt/token/token.module';
import { DoubleJwtModule } from '../double-jwt/double-jwt.module';

@Module({
	imports: [
		LocalAuthModule,
		DoubleJwtModule,
		TypeOrmModule.forFeature([User]),
		TokenModule,
	],
	providers: [AuthService],
	controllers: [AuthController],
	exports: [AuthService],
})
export class AuthModule {}
