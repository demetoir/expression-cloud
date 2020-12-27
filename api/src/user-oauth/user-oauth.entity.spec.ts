import { assert } from 'chai';
import { UserOauthEntity } from 'src/user-oauth/user-oauth.entity';
import { expectShouldNotCallThis } from 'test/lib/helper/jestHelper';
import { UserFactory } from 'test/user/user/user.factory';
import { getConnectionForTest } from 'test/util/typeorm';
import { Connection, Repository } from 'typeorm';

const database = 'user_oauth_entity';
describe('user oauth entity', () => {
	let connection: Connection;
	let oauthRepository: Repository<UserOauthEntity>;

	beforeAll(async () => {
		connection = await getConnectionForTest(database);

		oauthRepository = connection.getRepository(UserOauthEntity);
	});

	afterAll(async () => {
		await connection.close();
	});

	it('should able to get repository from connection manager', () => {
		assert.isNotNull(oauthRepository);
	});

	it('should create new project', async () => {
		const oauth = new UserOauthEntity();
		oauth.type = 1;
		oauth.authId = 'id';

		await connection.manager.save(oauth);

		const newEntity = await oauthRepository.findOne({ id: oauth.id });

		assert.equal(newEntity.id, oauth.id);
	});

	describe('column type check', () => {
		it('should not null on type', async () => {
			try {
				const type = null;
				const authId = 'id';

				const oauth = new UserOauthEntity();
				oauth.type = type;
				oauth.authId = authId;

				await connection.manager.save(oauth);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e.message).toBe("Column 'type' cannot be null");
			}
		});

		it('should not null on authId', async () => {
			try {
				const type = 0;
				const authId = null;

				const oauth = new UserOauthEntity();
				oauth.type = type;
				oauth.authId = authId;

				await connection.manager.save(oauth);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e.message).toBe("Column 'auth_id' cannot be null");
			}
		});
	});

	// describe('relation', () => {
	// 	let oauth;
	//
	// 	it('should prepare entity', async () => {
	// 		oauth = new UserOauthEntity();
	// 		oauth.type = 1;
	// 		oauth.authId = 'id';
	//
	// 		await connection.manager.save(oauth);
	// 	});
	//
	// 	it('should relate with user entity', async () => {
	// 		const user = UserFactory.build();
	// 		await connection.manager.save(user);
	//
	// 		user.oauth = oauth;
	// 		await connection.manager.save(user);
	//
	// 		oauth.user = user;
	// 		await connection.manager.save(oauth);
	//
	// 		const resultProject = await oauthRepository.findOne({
	// 			where: { id: oauth.id },
	// 			relations: ['user'],
	// 		});
	//
	// 		assert.equal(resultProject.user.id, user.id);
	// 	});
	// });
});
