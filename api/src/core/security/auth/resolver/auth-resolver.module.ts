import { AuthResolver } from './auth.resolver';
import { AuthServiceModule } from '../service';
import { JwtConfigModule } from '../../../../global/config/jwt-config';
import { ResolverModule } from '../../../../common';

@ResolverModule({
	resolver: AuthResolver,
	imports: [AuthServiceModule, JwtConfigModule],
})
export class AuthResolverModule {}
