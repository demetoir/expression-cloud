import { Module } from '@nestjs/common';
import { JwtConfigModule } from 'src/security/config';
import { AuthResolver } from './auth.resolver';
import { AuthServiceModule } from '../service';

@Module({
	imports: [AuthServiceModule, JwtConfigModule],
	providers: [AuthResolver],
	exports: [AuthResolver],
})
export class AuthResolverModule {}
