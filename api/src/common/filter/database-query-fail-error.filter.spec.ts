// all-exception.filter.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { Controller, Get, INestApplication, UseFilters } from '@nestjs/common';
import { DatabaseQueryFailFilter } from './database-query-fail-error.filter';
import { QueryFailedError } from 'typeorm/index';
import * as request from 'supertest';
import { AuthenticationError } from '../../auth/auth/error';

@UseFilters(new DatabaseQueryFailFilter())
@Controller('/dummy')
class DummyController {
	@Get('/raiseTargetError')
	raiseTargetError() {
		throw new QueryFailedError('query', ['shit'], TypeError());
	}

	@Get('/raiseNonTargetError')
	raiseNonTargetError() {
		throw new AuthenticationError('not this');
	}

	@Get('/raiseNoError')
	raiseNoError() {
		return;
	}
}

describe('unit test typeorm query fail error filter', () => {
	let app: INestApplication;

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			controllers: [DummyController],
		}).compile();

		app = moduleFixture.createNestApplication();

		await app.init();
	});

	it('should be defined', () => {
		expect(app).toBeDefined();
		expect(new DatabaseQueryFailFilter()).toBeDefined();
	});

	it('should filter QueryFailedError', async () => {
		await request(app.getHttpServer())
			.get('/dummy/raiseTargetError')
			.expect(400)
			.expect((res) => {
				const { body } = res;
				expect(body.statusCode).toBeDefined();
				expect(body.statusCode).toBe(400);
				expect(body.path).toBeDefined();
				expect(body.path).toBe('/dummy/raiseTargetError');
				expect(body.message).toBeDefined();
				expect(body.message).toBe('TypeError');
			});
	});

	it('should not filter non target Error', async () => {
		await request(app.getHttpServer())
			.get('/dummy/raiseNonTargetError')
			.expect(500)
			.expect({ statusCode: 500, message: 'Internal server error' });
	});

	it('should filter QueryFailedError', async () => {
		await request(app.getHttpServer())
			.get('/dummy/raiseNoError')
			.expect(200);
	});
});
