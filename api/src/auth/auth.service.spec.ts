import { Test, TestingModule } from '@nestjs/testing';
import { LocalAuthModule } from './localAuth/localAuth.module';
import { AuthService } from './auth.service';
import { IssueTokenRequestDto } from './dto/issueToken.request.dto';
import { IssueTokenResponseDto } from './dto/issueToken.response.dto';
import { JWTAuthService } from './JWTAuth/JWTAuth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../common/model/entity/user.entity';
import { MockRepository } from '../../test/lib/mock/MockRepository';
import { Repository } from 'typeorm';
import { UserRepository } from '../user/userRepository/user.repository';
import { InvalidUserException } from './error/invalidUserException.error';
import { ShouldNotRaiseThisError } from '../../test/lib/error/shouldNotRaiseThis.error';

const expiredIn = 3600;
const tokenType = 'bearer';

export class MockJWTAuthService {
	expiredIn = expiredIn;
	tokenType = tokenType;
	issueAccessToken = jest.fn();
	issueRefreshToken = jest.fn();
	revokeAccessToken = jest.fn();
	revokeRefreshToken = jest.fn();
	validate = jest.fn();
	signToken = jest.fn();
}

describe('AuthService', () => {
	let service: AuthService;
	let mockJWTAuthService: MockJWTAuthService;
	let userRepository: Repository<UserRepository>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [LocalAuthModule],
			providers: [
				AuthService,
				{
					provide: JWTAuthService,
					useClass: MockJWTAuthService,
				},
				{
					provide: getRepositoryToken(UserEntity),
					useClass: MockRepository,
				},
			],
		}).compile();

		service = module.get(AuthService);
		mockJWTAuthService = module.get(JWTAuthService);
		userRepository = module.get(getRepositoryToken(UserEntity));
	});

	it('should be DI', () => {
		expect(service).toBeDefined();
		expect(mockJWTAuthService).toBeDefined();
		expect(userRepository).toBeDefined();
	});

	it('should define method', function () {
		expect(service.issueToken).toBeDefined();
		expect(service.refreshToken).toBeDefined();
		expect(service.revokeToken).toBeDefined();
	});

	describe('method issueToken', function () {
		it('should success', async function () {
			// given mockJWTAuthService

			const accessToken = 'access token';
			const refreshToken = 'refresh token';
			mockJWTAuthService.issueAccessToken.mockReturnValue([
				'access token',
				'1',
			]);
			mockJWTAuthService.issueRefreshToken.mockReturnValue([
				'refresh token',
				'2',
			]);

			// given dto
			const dto = new IssueTokenRequestDto();
			dto.username = 'root';
			dto.password = 'pass';

			//when
			const res: IssueTokenResponseDto = await service.issueToken(dto);

			//than
			expect(res).toBeInstanceOf(IssueTokenResponseDto);

			expect(res.tokenType).toBe(tokenType);
			expect(res.expiresIn).toBe(expiredIn);
			expect(res.accessToken).toBe(accessToken);
			expect(res.refreshToken).toBe(refreshToken);
		});

		it('raise error if invalid user', async function () {
			// given dto
			const dto = new IssueTokenRequestDto();
			dto.username = 'root1234';
			dto.password = 'pass';

			try {
				//when
				await service.issueToken(dto);

				throw new ShouldNotRaiseThisError();
			} catch (e) {
				expect(e).toBeInstanceOf(InvalidUserException);
			}
		});
	});

	describe('method refreshToken', function () {
		it('should success', async function () {
			// todo: add test
		});
	});

	describe('method revokeToken', function () {
		it('should success', async function () {
			//todo: add test
		});
	});
});
