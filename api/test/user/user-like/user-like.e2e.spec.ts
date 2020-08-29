import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { GlobalTypeOrmModule } from '../../../src/database/GlobalTypeOrm.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLikeEntity } from '../../../src/user/user-like/user-like.entity';
import { UserLikeModule } from '../../../src/user/user-like/user-like.module';
import * as request from 'supertest';
import { UserFactory } from '../user/user.factory';
import { Connection, EntityManager } from 'typeorm/index';
import { entityToResponse } from '../../util';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import * as _ from 'lodash';
import { MAX_LIMIT } from '../../../src/user/user-like/user-like.controller';
import { UserEntity } from '../../../src/user/user/user.entity';

describe('UserLikeModule (e2e)', () => {
	let app: INestApplication;
	let repository: Repository<UserLikeEntity>;
	let connection: Connection;
	let manager: EntityManager;

	async function prepareDb(n = 10) {
		const users = [];
		for await (const _i of _.range(n)) {
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

		const storedUsers = await connection.getRepository(UserEntity).find();
		return {
			users: storedUsers,
			likes,
		};
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
		it('return many resource', async function () {
			const { likes } = await prepareDb(1);

			const expectBody = entityToResponse(likes).slice(0, MAX_LIMIT);
			await request(app.getHttpServer())
				.get('/v1/user-likes')
				.expect(200)
				.expect(expectBody);
		});

		it('return many but limit', async function () {
			const { likes } = await prepareDb(1);

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
			const { likes } = await prepareDb(10);

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
			const { likes } = await prepareDb(10);

			const expectMaxLimit = MAX_LIMIT;
			const limitOverMaxLimit = 50;
			const offset = 20;

			const expectBodyData = likes
				.slice(offset, offset + expectMaxLimit)
				.map((x) => entityToResponse(x));

			await request(app.getHttpServer())
				.get('/v1/user-likes')
				.query({ limit: limitOverMaxLimit, offset: offset })
				.expect(200)
				.expect((res) => {
					expect(res.body.data).toEqual(expectBodyData);
				});
		});

		it('return get many with query string [toUserId, fromUserId]', async function () {
			const { likes } = await prepareDb(10);

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
			const user1 = UserFactory.build();
			await manager.save(user1);

			const user2 = UserFactory.build();
			await manager.save(user2);

			const reqBody = {
				fromUserId: user1.id,
				toUserId: user2.id,
			};

			await request(app.getHttpServer())
				.post('/v1/user-likes')
				.send(reqBody)
				.expect(201)
				.expect((res) => {
					const { body } = res;

					expect(body.fromUserId).toBeDefined();
					expect(body.fromUserId).toBe(user1.id);
					expect(body.toUserId).toBeDefined();
					expect(body.toUserId).toBe(user2.id);
				});
		});

		it('error if not exist fromUserId, toUserId in DB', async function () {
			const user1 = UserFactory.build();
			await manager.save(user1);

			const user2 = UserFactory.build();
			await manager.save(user2);

			const reqBody = {
				fromUserId: user1.id,
				toUserId: user2.id,
			};

			await manager.remove(user1);
			await manager.remove(user2);

			await request(app.getHttpServer())
				.post('/v1/user-likes')
				.send(reqBody)
				.expect(400)
				.expect({
					statusCode: 400,
					message: 'database constraint fail error',
					error: 'Bad Request',
				});
		});

		it('error if not exist fromUserId in DB', async function () {
			const fromUser = UserFactory.build();
			await manager.save(fromUser);

			const toUser = UserFactory.build();
			await manager.save(toUser);

			const reqBody = {
				fromUserId: fromUser.id,
				toUserId: toUser.id,
			};

			await manager.remove(fromUser);

			await request(app.getHttpServer())
				.post('/v1/user-likes')
				.send(reqBody)
				.expect(400)
				.expect({
					statusCode: 400,
					message: 'database constraint fail error',
					error: 'Bad Request',
				});
		});

		it('error if not exist toUserId in DB', async function () {
			const toUser = UserFactory.build();
			await manager.save(toUser);

			const fromUser = UserFactory.build();
			await manager.save(fromUser);

			const reqBody = {
				fromUserId: toUser.id,
				toUserId: fromUser.id,
			};

			await manager.remove(toUser);

			await request(app.getHttpServer())
				.post('/v1/user-likes')
				.send(reqBody)
				.expect(400)
				.expect({
					statusCode: 400,
					message: 'database constraint fail error',
					error: 'Bad Request',
				});
		});

		describe('error if fromUserId is invalid', function () {
			it('should not be string', async function () {
				const toUser = UserFactory.build();
				await manager.save(toUser);

				const fromUser = UserFactory.build();
				await manager.save(fromUser);

				const reqBody = {
					fromUserId: 'toUser.id',
					toUserId: toUser.id,
				};

				await request(app.getHttpServer())
					.post('/v1/user-likes')
					.send(reqBody)
					.expect(400)
					.expect({
						statusCode: 400,
						message: [
							'fromUserId must be a positive number',
							'fromUserId must be a number conforming to the specified constraints',
						],
						error: 'Bad Request',
					});
			});

			it('should not be array', async function () {
				const toUser = UserFactory.build();
				await manager.save(toUser);

				const fromUser = UserFactory.build();
				await manager.save(fromUser);

				const reqBody = {
					fromUserId: [],
					toUserId: toUser.id,
				};

				await request(app.getHttpServer())
					.post('/v1/user-likes')
					.send(reqBody)
					.expect(400)
					.expect({
						statusCode: 400,
						message: [
							'fromUserId must be a positive number',
							'fromUserId must be a number conforming to the specified constraints',
						],
						error: 'Bad Request',
					});
			});

			it('should not be object', async function () {
				const toUser = UserFactory.build();
				await manager.save(toUser);

				const fromUser = UserFactory.build();
				await manager.save(fromUser);

				const reqBody = {
					fromUserId: {},
					toUserId: toUser.id,
				};

				await request(app.getHttpServer())
					.post('/v1/user-likes')
					.send(reqBody)
					.expect(400)
					.expect({
						statusCode: 400,
						message: [
							'fromUserId must be a positive number',
							'fromUserId must be a number conforming to the specified constraints',
						],
						error: 'Bad Request',
					});
			});

			it('should not be boolean', async function () {
				const toUser = UserFactory.build();
				await manager.save(toUser);

				const fromUser = UserFactory.build();
				await manager.save(fromUser);

				const reqBody = {
					fromUserId: false,
					toUserId: toUser.id,
				};

				await request(app.getHttpServer())
					.post('/v1/user-likes')
					.send(reqBody)
					.expect(400)
					.expect({
						statusCode: 400,
						message: [
							'fromUserId must be a positive number',
							'fromUserId must be a number conforming to the specified constraints',
						],
						error: 'Bad Request',
					});
			});

			it('should not be null', async function () {
				const toUser = UserFactory.build();
				await manager.save(toUser);

				const fromUser = UserFactory.build();
				await manager.save(fromUser);

				const reqBody = {
					fromUserId: null,
					toUserId: toUser.id,
				};

				await request(app.getHttpServer())
					.post('/v1/user-likes')
					.send(reqBody)
					.expect(400)
					.expect({
						statusCode: 400,
						message: [
							'fromUserId must be a positive number',
							'fromUserId must be a number conforming to the specified constraints',
						],
						error: 'Bad Request',
					});
			});

			it('should not be negative number', async function () {
				const toUser = UserFactory.build();
				await manager.save(toUser);

				const fromUser = UserFactory.build();
				await manager.save(fromUser);

				const reqBody = {
					fromUserId: -34,
					toUserId: toUser.id,
				};

				await request(app.getHttpServer())
					.post('/v1/user-likes')
					.send(reqBody)
					.expect(400)
					.expect({
						statusCode: 400,
						message: ['fromUserId must be a positive number'],
						error: 'Bad Request',
					});
			});

			it('should not be undefined', async function () {
				const toUser = UserFactory.build();
				await manager.save(toUser);

				const fromUser = UserFactory.build();
				await manager.save(fromUser);

				const reqBody = {
					fromUserId: undefined,
					toUserId: toUser.id,
				};

				await request(app.getHttpServer())
					.post('/v1/user-likes')
					.send(reqBody)
					.expect(400)
					.expect({
						statusCode: 400,
						message: [
							'fromUserId must be a positive number',
							'fromUserId must be a number conforming to the specified constraints',
						],
						error: 'Bad Request',
					});
			});
		});

		describe('error if toUserId is invalid', function () {
			it('should not be string', async function () {
				const toUser = UserFactory.build();
				await manager.save(toUser);

				const fromUser = UserFactory.build();
				await manager.save(fromUser);

				const reqBody = {
					fromUserId: fromUser.id,
					toUserId: 'userId',
				};

				await request(app.getHttpServer())
					.post('/v1/user-likes')
					.send(reqBody)
					.expect(400)
					.expect({
						statusCode: 400,
						message: [
							'toUserId must be a positive number',
							'toUserId must be a number conforming to the specified constraints',
						],
						error: 'Bad Request',
					});
			});

			it('should not be array', async function () {
				const toUser = UserFactory.build();
				await manager.save(toUser);

				const fromUser = UserFactory.build();
				await manager.save(fromUser);

				const reqBody = {
					fromUserId: fromUser.id,
					toUserId: [],
				};

				await request(app.getHttpServer())
					.post('/v1/user-likes')
					.send(reqBody)
					.expect(400)
					.expect({
						statusCode: 400,
						message: [
							'toUserId must be a positive number',
							'toUserId must be a number conforming to the specified constraints',
						],
						error: 'Bad Request',
					});
			});

			it('should not be object', async function () {
				const toUser = UserFactory.build();
				await manager.save(toUser);

				const fromUser = UserFactory.build();
				await manager.save(fromUser);

				const reqBody = {
					fromUserId: fromUser.id,
					toUserId: {},
				};

				await request(app.getHttpServer())
					.post('/v1/user-likes')
					.send(reqBody)
					.expect(400)
					.expect({
						statusCode: 400,
						message: [
							'toUserId must be a positive number',
							'toUserId must be a number conforming to the specified constraints',
						],
						error: 'Bad Request',
					});
			});

			it('should not be boolean', async function () {
				const toUser = UserFactory.build();
				await manager.save(toUser);

				const fromUser = UserFactory.build();
				await manager.save(fromUser);

				const reqBody = {
					fromUserId: fromUser.id,
					toUserId: false,
				};

				await request(app.getHttpServer())
					.post('/v1/user-likes')
					.send(reqBody)
					.expect(400)
					.expect({
						statusCode: 400,
						message: [
							'toUserId must be a positive number',
							'toUserId must be a number conforming to the specified constraints',
						],
						error: 'Bad Request',
					});
			});

			it('should not be null', async function () {
				const toUser = UserFactory.build();
				await manager.save(toUser);

				const fromUser = UserFactory.build();
				await manager.save(fromUser);

				const reqBody = {
					fromUserId: fromUser.id,
					toUserId: null,
				};

				await request(app.getHttpServer())
					.post('/v1/user-likes')
					.send(reqBody)
					.expect(400)
					.expect({
						statusCode: 400,
						message: [
							'toUserId must be a positive number',
							'toUserId must be a number conforming to the specified constraints',
						],
						error: 'Bad Request',
					});
			});

			it('should not be negative number', async function () {
				const toUser = UserFactory.build();
				await manager.save(toUser);

				const fromUser = UserFactory.build();
				await manager.save(fromUser);

				const reqBody = {
					fromUserId: fromUser.id,
					toUserId: -4,
				};

				await request(app.getHttpServer())
					.post('/v1/user-likes')
					.send(reqBody)
					.expect(400)
					.expect({
						statusCode: 400,
						message: ['toUserId must be a positive number'],
						error: 'Bad Request',
					});
			});

			it('should not be undefined', async function () {
				const toUser = UserFactory.build();
				await manager.save(toUser);

				const fromUser = UserFactory.build();
				await manager.save(fromUser);

				const reqBody = {
					fromUserId: fromUser.id,
					toUserId: undefined,
				};

				await request(app.getHttpServer())
					.post('/v1/user-likes')
					.send(reqBody)
					.expect(400)
					.expect({
						statusCode: 400,
						message: [
							'toUserId must be a positive number',
							'toUserId must be a number conforming to the specified constraints',
						],
						error: 'Bad Request',
					});
			});
		});
	});

	describe('/v1/user-likes (DELETE)', () => {
		it('should delete one by query parameter', async function () {
			const { likes } = await prepareDb(1);

			const like = likes[0];
			const queryString = RequestQueryBuilder.create({
				search: {
					fromUserId: like.fromUserId,
					toUserId: like.toUserId,
				},
			}).query();

			await request(app.getHttpServer())
				.delete('/v1/user-likes')
				.query(queryString)
				.expect(200);
		});

		it('404 if not exist resource', async function () {
			const { likes } = await prepareDb(1);

			const like = likes[0];
			await manager.softRemove(like);

			const queryString = RequestQueryBuilder.create({
				search: {
					fromUserId: like.fromUserId,
					toUserId: like.toUserId,
				},
			}).query();

			await request(app.getHttpServer())
				.delete('/v1/user-likes')
				.query(queryString)
				.expect(404);
		});
	});

	describe('/v1/user-likes (patch)', () => {
		it('should not have update method', async function () {
			await request(app.getHttpServer())
				.patch('/v1/user-likes')
				.expect(404);
		});
	});

	describe('/v1/user-likes (put)', () => {
		it('should not have put method', async function () {
			await request(app.getHttpServer())
				.put('/v1/user-likes')
				.expect(404);
		});
	});
});
