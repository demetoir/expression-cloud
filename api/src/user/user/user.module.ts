import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepositoryModule } from '../userRepository/userRepository.module';

@Module({
	imports: [UserRepositoryModule],
	controllers: [UserController],
	providers: [UserService],
})
export class UserModule {}
