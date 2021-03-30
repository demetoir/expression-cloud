import { TokenModule } from '../../token';
import { AuthService } from './auth.service';
import { JwtConfigModule } from '../../../../global/config/jwt-config';
import { ServiceModule } from '../../../../common';

@ServiceModule({
	imports: [TokenModule, JwtConfigModule],
	service: AuthService,
})
export class AuthServiceModule {}
