import { assert } from 'chai';
import { createConnection } from 'typeorm';
import * as config from '../../../ormconfig.js';
import { UserEntity } from './user.entity';
import { OauthEntity } from './oauth.entity';

describe('oauth entity', () => {
	let connection;
	let oauthRepository;

	beforeAll(async () => {
		connection = await createConnection(config);
		await connection.synchronize();

		oauthRepository = connection.getRepository(OauthEntity);
	});

	afterAll(async () => {
		connection.close();
	});

	it('should able to get repository from connection manager', function () {
		assert.isNotNull(oauthRepository);
	});

	it('should create new project', async function () {
		const oauth = new OauthEntity();
		oauth.type = 1;
		oauth.authId = 'id';

		await connection.manager.save(oauth);

		const newEntity = await oauthRepository.findOne({ id: oauth.id });

		assert.equal(newEntity.id, oauth.id);
	});

	describe('column type check', () => {
		it('should not null on type', async function () {
			try {
				const type = null;
				const authId = 'id';

				const oauth = new OauthEntity();
				oauth.type = type;
				oauth.authId = authId;

				await connection.manager.save(oauth);

				assert(false, 'should throw this error');
			} catch (e) {
				assert.equal(
					e.message,
					'SQLITE_CONSTRAINT: NOT NULL constraint failed: oauths.type',
				);
			}
		});

		it('should not null on authId', async function () {
			try {
				const type = 0;
				const authId = null;

				const oauth = new OauthEntity();
				oauth.type = type;
				oauth.authId = authId;

				await connection.manager.save(oauth);

				assert(false, 'should throw this error');
			} catch (e) {
				assert.equal(
					e.message,
					'SQLITE_CONSTRAINT: NOT NULL constraint failed: oauths.authId',
				);
			}
		});
	});

	describe('relation', () => {
		let oauth;

		it('should prepare entity', async () => {
			oauth = new OauthEntity();
			oauth.type = 1;
			oauth.authId = 'id';

			await connection.manager.save(oauth);
		});

		it('should relate with user entity', async () => {
			const user = new UserEntity();
			user.name = 'user';
			user.description = 'description';
			user.email = 'email';
			await connection.manager.save(user);

			user.oauth = oauth;
			await connection.manager.save(user);

			oauth.user = user;
			await connection.manager.save(oauth);

			const resultProject = await oauthRepository.findOne({
				where: { id: oauth.id },
				relations: ['user'],
			});

			assert.equal(resultProject.user.id, user.id);
		});
	});
});
