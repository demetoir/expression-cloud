import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app/app.module';

describe('AppController (e2e)', () => {
	let app: INestApplication;

	// sqlite 연결시 connection already exist error 발생으로 beforeEach 가아닌 beforeAll을 넣는
	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('should be init', function () {
		expect(app).toBeDefined();
	});

	it('/hello (GET)', () => {
		return request(app.getHttpServer())
			.get('/hello')
			.expect(200)
			.expect('Hello World!');
	});

	afterAll(async () => {
		await app.close();
	});
});
