import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { GlobalTypeOrmModule } from '../../../src/database/GlobalTypeOrm.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserModule } from '../../../src/user/user/user.module';
import { expectShouldBeImplementTest } from '../../lib/helper/jestHelper';
import { UserLikeEntity } from '../../../src/user/user-like/user-like.entity';

describe('UserLikeModule (e2e)', () => {
	let app: INestApplication;
	let repository: Repository<UserLikeEntity>;

	// sqlite 연결시 connection already exist error 발생으로 beforeEach 가아닌 beforeAll을 넣는
	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [UserModule, GlobalTypeOrmModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		repository = moduleFixture.get(getRepositoryToken(UserLikeEntity));

		await app.init();
	});

	afterAll(async () => {
		await app.close();
	});

	it('should be init', function () {
		expect(app).toBeDefined();
		expect(repository).toBeDefined();
	});

	describe('/v1/user-likes (GET)', () => {
		it('return empty', function () {
			expectShouldBeImplementTest();
		});

		it('return many resource', function () {
			expectShouldBeImplementTest();
		});

		it('return many but limit', function () {
			expectShouldBeImplementTest();
		});

		it('should get many but max limit', function () {
			expectShouldBeImplementTest();
		});

		it('should get many with offset and limit', function () {
			expectShouldBeImplementTest();
		});

		it('return get many with query string [toUserId, fromUserId]', function () {
			expectShouldBeImplementTest();
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
