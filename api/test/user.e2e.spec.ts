import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { UserModule } from '../src/user/user.module';
import { GlobalTypeOrmModule } from '../src/database/GlobalTypeOrm.module';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../src/common/model/entity/user.entity';
import { Repository } from 'typeorm';
import { serialize } from 'class-transformer';

function entityToResponse(entity) {
	return JSON.parse(serialize(entity));
}
// todo: moduleFixture에서 typeorm connection 가져와서 sync 해야함
describe('UserModule (e2e)', () => {
	let app: INestApplication;
	let userRepository: Repository<UserEntity>;

	// sqlite 연결시 connection already exist error 발생으로 beforeEach 가아닌 beforeAll을 넣는
	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [UserModule, GlobalTypeOrmModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		userRepository = moduleFixture.get(getRepositoryToken(UserEntity));

		await app.init();
	});

	it('should be init', function () {
		expect(app).toBeDefined();
		expect(userRepository).toBeDefined();
	});

	describe('/v1/users (GET)', () => {
		it('should return empty', function () {
			const expectBody = [];
			return request(app.getHttpServer())
				.get('/v1/users')
				.expect(200)
				.expect(expectBody);
		});
	});

	describe('/v1/users (POST)', () => {
		it('should create new resource', async function () {
			const resBody = {};

			const reqBody = {
				name: 'name',
				email: 'email',
				description: 'description',
			};

			const res = await request(app.getHttpServer())
				.post('/v1/users')
				.send(reqBody)
				.expect(201);

			const body = res.body;

			const newUser = await userRepository.findOne({ id: body.id });

			expect(res.body).toEqual(entityToResponse(newUser));
		});
	});

	describe('/v1/users/{id} (GET)', () => {
		it('should success', async function () {
			const newUser = new UserEntity();
			newUser.name = 'name';
			newUser.description = 'description';
			newUser.email = 'email2';

			const user = await userRepository.save(newUser);
			const id = user.id;

			const expectedBody = entityToResponse(user);

			return request(app.getHttpServer())
				.get(`/v1/users/${id}`)
				.expect(200)
				.expect(expectedBody);
		});

		it('404 on not exist resource', async function () {
			const id = 4321;
			const shouldNotExist = await userRepository.findOne({ id: id });

			expect(shouldNotExist).not.toBeDefined();

			return request(app.getHttpServer())
				.get(`/v1/users/${id}`)
				.expect(404);
		});
	});

	// describe('/v1/users/{id} (PUT)', () => {
	// 	it('success', async function () {
	// 		const emptyBody = {};
	// 		let id = 2;
	// 		return request(app.getHttpServer())
	// 			.put(`/v1/users/${id}`)
	// 			.expect(200)
	// 			.expect(emptyBody);
	// 	});
	//
	// 	it('400 on invalid', async function () {
	// 		const emptyBody = {};
	// 		let id = 2;
	// 		return request(app.getHttpServer())
	// 			.put(`/v1/users/${id}`)
	// 			.expect(200)
	// 			.expect(emptyBody);
	// 	});
	//
	// 	it('404 on not exist resource', async function () {
	// 		const emptyBody = {};
	// 		let id = 2;
	// 		return request(app.getHttpServer())
	// 			.put(`/v1/users/${id}`)
	// 			.expect(200)
	// 			.expect(emptyBody);
	// 	});
	// });
	//
	// describe('/v1/users/{id} (PATCH)', () => {
	// 	it('success', async function () {
	// 		const expectBody = [];
	// 		let id = 1;
	// 		return request(app.getHttpServer())
	// 			.patch(`/v1/users/${id}`)
	// 			.expect(200)
	// 			.expect(expectBody);
	// 	});
	//
	// 	it('404 on not exist resource', async function () {
	// 		const expectBody = [];
	// 		let id = 1;
	// 		return request(app.getHttpServer())
	// 			.patch(`/v1/users/${id}`)
	// 			.expect(200)
	// 			.expect(expectBody);
	// 	});
	//
	// 	it('400 invalid ', async function () {
	// 		const expectBody = [];
	// 		let id = 1;
	// 		return request(app.getHttpServer())
	// 			.patch(`/v1/users/${id}`)
	// 			.expect(200)
	// 			.expect(expectBody);
	// 	});
	// });
	//
	// describe('/v1/users/{id} (DELETE)', () => {
	// 	it('success', async function () {
	// 		const expectBody = [];
	// 		let id = 1;
	// 		return request(app.getHttpServer())
	// 			.delete(`/v1/users/${id}`)
	// 			.expect(200)
	// 			.expect(expectBody);
	// 	});
	//
	// 	it('404 not exist resource', async function () {
	// 		const expectBody = [];
	// 		let id = 1;
	// 		return request(app.getHttpServer())
	// 			.delete(`/v1/users/${id}`)
	// 			.expect(404)
	// 			.expect(expectBody);
	// 	});
	// });

	afterAll(async () => {
		await app.close();
	});
});
