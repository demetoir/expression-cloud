import { Test, TestingModule } from '@nestjs/testing';
import { PassportModule } from '@nestjs/passport';
import { JWTAuthService } from './JWTAuth.service';
import { JwtModule } from '@nestjs/jwt';
import { JWTOptionService } from './token/config/JWTOption.service';
import { JWTStrategy } from './strategy/JWT.strategy';
import { TokenModule } from './token/token.module';

describe('JWTAuthService', () => {
	let service: JWTAuthService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				PassportModule,
				JwtModule.registerAsync({
					useClass: JWTOptionService,
				}),
				TokenModule,
			],
			providers: [JWTOptionService, JWTStrategy, JWTAuthService],
		}).compile();

		service = module.get<JWTAuthService>(JWTAuthService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
