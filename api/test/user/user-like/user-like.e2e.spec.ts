import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { GlobalTypeOrmModule } from '../../../src/database/GlobalTypeOrm.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { expectShouldBeImplementTest } from '../../lib/helper/jestHelper';
import { UserLikeEntity } from '../../../src/user/user-like/user-like.entity';
import { UserLikeModule } from '../../../src/user/user-like/user-like.module';
import * as request from 'supertest';
import { UserFactory } from '../user/user.factory';
import { Connection, EntityManager } from 'typeorm/index';
import { entityToResponse } from '../../util';
import { RequestQueryBuilder } from '@nestjsx/crud-request';

import * as _ from 'lodash';
import { MAX_LIMIT } from '../../../src/user/user-like/user-like.controller';

describe('UserLikeModule (e2e)', () => {
	let app: INestApplication;
	let repository: Repository<UserLikeEntity>;
	let connection: Connection;
	let manager: EntityManager;

	async function prepareDb(n = 10) {
		const users = [];
		for await (const i of _.range(n)) {
			const user = UserFactory.build();
			const stored = await manager.save(user);
			users.push(stored);
		}

		for await (const i of _.range(n)) {
			for await (const j of _.range(n)) {
				const like = new UserLikeEntity();

				like.toUserId = users[i].id;
				like.fromUserId = users[j].id;

				await manager.save(like);
			}
		}

		const likes = await repository.find();

		return { users, likes };
	}

	// sqlite 연결시 connection already exist error 발생으로 beforeEach 가아닌 beforeAll을 넣는
	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [UserLikeModule, GlobalTypeOrmModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		repository = moduleFixture.get(getRepositoryToken(UserLikeEntity));
		connection = moduleFixture.get(Connection);
		manager = connection.manager;

		await app.init();
	});

	afterAll(async () => {
		await app.close();
	});

	it('should be init', function () {
		expect(app).toBeDefined();
		expect(repository).toBeDefined();
		expect(connection).toBeDefined();
	});

	describe('/v1/user-likes (GET)', () => {
		it('return empty, if not exist', function () {
			const expectBody = [];
			return request(app.getHttpServer())
				.get('/v1/user-likes')
				.expect(200)
				.expect(expectBody);
		});

		it('return many resource', async function () {
			const user1 = UserFactory.build();
			const user2 = UserFactory.build();

			await manager.save(user1);
			await manager.save(user2);

			const like = new UserLikeEntity();
			like.fromUserId = user1.id;
			like.toUserId = user2.id;
			await manager.save(like);

			const expectBody = [entityToResponse(like)];
			await request(app.getHttpServer())
				.get('/v1/user-likes')
				.expect(200)
				.expect(expectBody);
		});

		it('return many but limit', async function () {
			const { users, likes } = await prepareDb(10);

			const expectBody = likes
				.slice(0, 4)
				.map((x) => entityToResponse(x));

			await request(app.getHttpServer())
				.get('/v1/user-likes')
				.query({ limit: 4 })
				.expect(200)
				.expect(expectBody);
		});

		it('should get many but max limit', async function () {
			const { users, likes } = await prepareDb(10);

			const expectMaxLimit = MAX_LIMIT;
			const limitOverMaxLimit = 50;
			const expectBody = likes
				.slice(0, expectMaxLimit)
				.map((x) => entityToResponse(x));

			await request(app.getHttpServer())
				.get('/v1/user-likes')
				.query({ limit: limitOverMaxLimit })
				.expect(200)
				.expect(expectBody);
		});

		it('should get many with offset and limit', async function () {
			const { users, likes } = await prepareDb(10);

			const expectMaxLimit = MAX_LIMIT;
			const limitOverMaxLimit = 50;
			const offset = 20;

			const expectBody = {
				data: likes
					.slice(offset, offset + expectMaxLimit)
					.map((x) => entityToResponse(x)),
				page: 2,
				pageCount: 16,
				total: 301,
				count: 20,
			};

			await request(app.getHttpServer())
				.get('/v1/user-likes')
				.query({ limit: limitOverMaxLimit, offset: offset })
				.expect(200)
				.expect(expectBody);
		});

		it('return get many with query string [toUserId, fromUserId]', async function () {
			const { users, likes } = await prepareDb(10);

			const like = likes[0];
			const queryString = RequestQueryBuilder.create({
				search: {
					fromUserId: like.fromUserId,
					toUserId: like.toUserId,
				},
			}).query();

			const expectBody = [entityToResponse(like)];

			await request(app.getHttpServer())
				.get('/v1/user-likes')
				.query(queryString)
				.expect(200)
				.expect(expectBody);
		});
	});

	describe('/v1/user-likes (POST)', () => {
		it('create new resource and return', async function () {
			expectShouldBeImplementTest();
		});

		it('error if invalid body.toUserId', async function () {
			expectShouldBeImplementTest();
		});

		it('error if invalid body.fromUserId', async function () {
			expectShouldBeImplementTest();
		});

		it('create new resource', async function () {
			expectShouldBeImplementTest();
		});
	});

	describe('/v1/user-likes (DELETE)', () => {
		it('should delete one by query parameter', async function () {
			expectShouldBeImplementTest();
		});

		it('404 if not exist resource', async function () {
			expectShouldBeImplementTest();
		});
	});

	describe('/v1/user-likes (update)', () => {
		it('should not have update method', async function () {
			expectShouldBeImplementTest();
		});
	});

	describe('/v1/user-likes (put)', () => {
		it('should not have put method', async function () {
			expectShouldBeImplementTest();
		});
	});
});
