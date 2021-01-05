import { Test, TestingModule } from '@nestjs/testing';
import { Controller, Get, INestApplication, UseFilters } from '@nestjs/common';
import * as request from 'supertest';
import { AuthenticationError } from 'src/auth/auth/error';
import { DatabaseConstraintFailError } from '../errors/database-constraint-fail.error';
import { DbQueryFailError } from 'src/common/errors/db-query-fail.error';
import { DatabaseQueryFailFilter } from './database-query-fail-error.filter';

@UseFilters(new DatabaseQueryFailFilter())
@Controller('/dummy')
class DummyController {
	@Get('/raiseDatabaseConstraintFailError')
	raiseDatabaseConstraintFailError() {
		throw new DatabaseConstraintFailError(new Error());
	}

	@Get('/raiseDBQueryFailError')
	raiseDatabaseQueryFailFilter() {
		throw new DbQueryFailError(new Error());
	}

	@Get('/raiseNonTargetError')
	raiseNonTargetError() {
		throw new AuthenticationError('not this');
	}

	@Get('/raiseNoError')
	raiseNoError() {}
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

	it('should filter DatabaseConstraintFailError', async () => {
		await request(app.getHttpServer())
			.get('/dummy/raiseDatabaseConstraintFailError')
			.expect(400)
			.expect((res) => {
				const { body } = res;
				expect(body.statusCode).toBeDefined();
				expect(body.statusCode).toBe(400);
				expect(body.message).toBeDefined();
				expect(body.message).toBe('database constraint fail error');
				expect(body.error).toBeDefined();
				expect(body.error).toBe('Bad Request');
			});
	});

	it('should filter DBQueryFailError', async () => {
		await request(app.getHttpServer())
			.get('/dummy/raiseDBQueryFailError')
			.expect(500)
			.expect((res) => {
				const { body } = res;
				expect(body.statusCode).toBeDefined();
				expect(body.statusCode).toBe(500);
				expect(body.message).toBeDefined();
				expect(body.message).toBe('unhandled error');
				expect(body.error).toBeDefined();
				expect(body.error).toBe('Internal Server Error');
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
