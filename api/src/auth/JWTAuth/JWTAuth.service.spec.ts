import { Test, TestingModule } from '@nestjs/testing';
import { PassportModule } from '@nestjs/passport';
import { JWTAuthService } from './JWTAuth.service';
import { JwtModule } from '@nestjs/jwt';
import { JWTOptionService } from './config/JWTOption.service';
import { JWTStrategy } from './strategy/JWT.strategy';
import { TokenService } from './token/Token.service';

describe('JWTAuthService', () => {
	let service: JWTAuthService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				PassportModule,
				JwtModule.registerAsync({
					useClass: JWTOptionService,
				}),
			],
			providers: [
				JWTOptionService,
				JWTStrategy,
				JWTAuthService,
				TokenService,
			],
		}).compile();

		service = module.get<JWTAuthService>(JWTAuthService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
