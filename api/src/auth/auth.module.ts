import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JWTAuthModule } from './JWTAuth/JWTAuth.module';
import { LocalAuthModule } from './localAuth/localAuth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../common/model/entity/user.entity';

@Module({
	imports: [
		LocalAuthModule,
		JWTAuthModule,
		TypeOrmModule.forFeature([UserEntity]),
	],
	providers: [AuthService],
	controllers: [AuthController],
})
export class AuthModule {}
