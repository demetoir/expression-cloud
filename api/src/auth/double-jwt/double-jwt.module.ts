import { Module } from '@nestjs/common';
import { JwtWrapperModule } from './jwt-wrapper';
import { DoubleJwtService } from './double-jwt.service';

// todo 이놈을 다이나믹 모율로 만들어서 jwt option configuration, payload class 를 injection해야한다
@Module({
	imports: [JwtWrapperModule],
	providers: [DoubleJwtService],
	exports: [DoubleJwtService],
})
export class DoubleJwtModule {}
