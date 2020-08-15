import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { JWTOptionService } from './JWTOption.service';
import { TokenModule } from './token/token.module';
import { JWTAuthService } from './JWTAuth.service';
import { JWTStrategy } from './strategy/JWT.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../common/model/entity/user.entity';

@Module({
	imports: [
		PassportModule,
		JwtModule.registerAsync({
			useClass: JWTOptionService,
		}),
		TokenModule,
		TypeOrmModule.forFeature([UserEntity]),
	],
	providers: [JWTOptionService, JWTStrategy, JWTAuthService],
	exports: [JWTAuthService],
})
export class JWTAuthModule {}
