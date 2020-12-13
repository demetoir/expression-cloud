import { Module } from '@nestjs/common';
import { DateTimeScalar } from 'src/common';
import { UserServiceModule } from '../service';
import { UserResolver } from './user.resolver';

@Module({
	imports: [UserServiceModule, DateTimeScalar],
	providers: [UserResolver],
})
export class UserResolverModule {}
