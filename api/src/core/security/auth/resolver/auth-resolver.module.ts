import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthServiceModule } from '../service';
import { JwtConfigModule } from '../../../../global/config/jwt-config';

@Module({
	imports: [AuthServiceModule, JwtConfigModule],
	providers: [AuthResolver],
	exports: [AuthResolver],
})
export class AuthResolverModule {}
