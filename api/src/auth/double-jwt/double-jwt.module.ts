import { Module } from '@nestjs/common';
import { JwtWrapperModule } from './jwt-wrapper';
import { TokenModule } from './token';
import { DoubleJwtService } from './double-jwt.service';

@Module({
	imports: [JwtWrapperModule, TokenModule],
	providers: [DoubleJwtService],
	exports: [DoubleJwtService],
})
export class DoubleJwtModule {}
