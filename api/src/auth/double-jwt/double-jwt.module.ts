import { Module } from '@nestjs/common';
import { JwtWrapperModule } from './jwt-wrapper/jwt-wrapper.module';
import { TokenModule } from './token/token.module';
import { DoubleJwtService } from './double-jwt.service';

@Module({
	imports: [JwtWrapperModule, TokenModule],

	providers: [DoubleJwtService],
	exports: [DoubleJwtService],
})
export class DoubleJwtModule {}
