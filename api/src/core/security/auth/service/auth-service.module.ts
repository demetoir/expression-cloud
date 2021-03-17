import { Module } from '@nestjs/common';
import { TokenModule } from 'src/core/security/token';
import { JwtConfigModule } from 'src/core/security/config';
import { AuthService } from './auth.service';

@Module({
	imports: [TokenModule, JwtConfigModule],
	providers: [AuthService],
	exports: [AuthService],
})
export class AuthServiceModule {}
