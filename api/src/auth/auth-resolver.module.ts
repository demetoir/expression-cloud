import { Module } from '@nestjs/common';
import { AuthResolver } from 'src/auth/auth.resolver';
import { AuthServiceModule } from 'src/auth/auth-service.module';

@Module({
	imports: [AuthServiceModule],
	providers: [AuthResolver],
})
export class AuthResolverModule {}
