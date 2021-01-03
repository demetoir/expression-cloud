import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { User } from 'src/user';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalAuthModule } from '../localAuth/localAuth.module';
import { DoubleJwtModule, TokenModule } from '../double-jwt';

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
