import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { UserModule } from '../src/user/user.module';
import { GlobalTypeOrmModule } from '../src/database/GlobalTypeOrm.module';
import * as request from 'supertest';

describe('UserModule (e2e)', () => {
	let app: INestApplication;

	// sqlite 연결시 connection already exist error 발생으로 beforeEach 가아닌 beforeAll을 넣는
	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [UserModule, GlobalTypeOrmModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('should be init', function () {
		expect(app).toBeDefined();
	});

	describe('/v1/users (GET)', () => {
		it('should return empty', function () {
			return request(app.getHttpServer())
				.get('/v1/users')
				.expect(200)
				.expect([]);
		});
	});

	afterAll(async () => {
		await app.close();
	});
});
