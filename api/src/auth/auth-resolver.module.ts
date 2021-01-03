import { Module } from '@nestjs/common';
import { AuthResolver } from 'src/auth/auth.resolver';
import { DoubleJwtModule } from 'src/auth/double-jwt';

@Module({
	imports: [DoubleJwtModule],
	providers: [AuthResolver],
})
export class AuthResolverModule {}
