import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './token.service';
import { JwtConfigModule } from '../../../global/config/jwt-config';
import { ServiceModule } from '../../../common';

@ServiceModule({
	imports: [JwtModule.register({}), JwtConfigModule],
	service: TokenService,
})
export class TokenModule {}
