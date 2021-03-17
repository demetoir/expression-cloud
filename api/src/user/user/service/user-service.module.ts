import { Module } from '@nestjs/common';
import { UserRepositoryModule } from 'src/user/user/repository';
import { UserService } from 'src/user/user/service/user.service';
import { DateTimeScalar } from 'src/common';

@Module({
	imports: [UserRepositoryModule, DateTimeScalar],
	providers: [UserService],
	exports: [UserService],
})
export class UserServiceModule {}
