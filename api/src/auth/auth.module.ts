import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JWTAuthModule } from './JWTAuth/JWTAuth.module';
import { LocalAuthModule } from './localAuth/localAuth.module';

@Module({
	imports: [LocalAuthModule, JWTAuthModule],
	providers: [AuthService],
	controllers: [AuthController],
})
export class AuthModule {}
