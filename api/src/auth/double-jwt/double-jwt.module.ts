import { Module } from '@nestjs/common';
import { CustomJwtModule } from './custom-jwt/custom-jwt.module';
import { TokenModule } from './token/token.module';
import { DoubleJwtService } from './double-jwt.service';

@Module({
	imports: [CustomJwtModule, TokenModule],

	providers: [DoubleJwtService],
	exports: [DoubleJwtService],
})
export class DoubleJwtModule {}
