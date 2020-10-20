import { Module } from '@nestjs/common';
import { UserController } from 'src/user/user.controller';
import { UserService } from 'src/user/user.service';
import { UserRepositoryModule } from 'src/user/userRepository/userRepository.module';

@Module({
	imports: [UserRepositoryModule],
	controllers: [UserController],
	providers: [UserService],
})
export class UserModule {}
