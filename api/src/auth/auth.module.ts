import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalAuthModule } from './localAuth/localAuth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../common/model/entity/user.entity';
import { DoubleJwtModule } from './double-jwt/double-jwt.module';

@Module({
	imports: [
		LocalAuthModule,
		DoubleJwtModule,
		TypeOrmModule.forFeature([UserEntity]),
	],
	providers: [AuthService],
	controllers: [AuthController],
})
export class AuthModule {}
