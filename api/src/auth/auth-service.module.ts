import { Module } from '@nestjs/common';
import { DoubleJwtModule } from 'src/auth/double-jwt';
import { AuthService } from 'src/auth/auth.service';

@Module({
	imports: [DoubleJwtModule],
	providers: [AuthService],
	exports: [AuthService],
})
export class AuthServiceModule {}
