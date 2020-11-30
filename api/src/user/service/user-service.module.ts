import { Module } from '@nestjs/common';
import { UserRepositoryModule } from 'src/user/repository';
import { UserService } from 'src/user/service/user.service';

@Module({
	imports: [UserRepositoryModule],
	providers: [UserService],
	exports: [UserService],
})
export class UserServiceModule {}
