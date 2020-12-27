import { assert } from 'chai';
import { Connection, QueryFailedError, Repository } from 'typeorm';
import { expectShouldNotCallThis } from 'test/lib/helper/jestHelper';
import { User } from 'src/user';
import { getConnectionForTest } from 'test/util/typeorm';
import { NoticeEntity } from './notice.entity';

const database = 'notice_entity';
describe('notice entity', () => {
	let userRepository: Repository<User>;
	let connection: Connection;
	let noticeRepository: Repository<NoticeEntity>;

	beforeAll(async () => {
		connection = await getConnectionForTest(database);

		userRepository = connection.getRepository(User);
		noticeRepository = connection.getRepository(NoticeEntity);
	});

	afterAll(async () => {
		await connection.close();
	});

	it('should able to get repository from connection manager', () => {
		expect(userRepository).toBeDefined();
		expect(connection).toBeDefined();
		expect(noticeRepository).toBeDefined();
	});

	it('should create entity', async () => {
		const notice = new NoticeEntity();
		notice.content = 'content';

		await connection.manager.save(notice);

		const newContent = await noticeRepository.findOne({ id: notice.id });

		assert.isNotNull(newContent);
	});

	describe('column type check', () => {
		it('should not null on content', async () => {
			try {
				const content = null;
				const notice = new NoticeEntity();
				notice.content = content;

				await connection.manager.save(notice);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e).toBeInstanceOf(QueryFailedError);
				expect(e.message).toBe("Column 'content' cannot be null");
			}
		});

		it('should not null on isRead', async () => {
			try {
				const content = 'content';
				const isRead = null;

				const notice = new NoticeEntity();
				notice.content = content;
				notice.isRead = isRead;

				await connection.manager.save(notice);

				expectShouldNotCallThis();
			} catch (e) {
				expect(e).toBeInstanceOf(QueryFailedError);
				expect(e.message).toBe("Column 'is_read' cannot be null");
			}
		});

		it('should be boolean type of isRead', async () => {
			const content = 'content';
			const isRead = true;

			const notice = new NoticeEntity();
			notice.content = content;
			notice.isRead = isRead;
			await connection.manager.save(notice);

			notice.isRead = true;
			await connection.manager.save(notice);
			const result1 = await noticeRepository.findOne({ id: notice.id });
			assert.equal(typeof result1.isRead, 'boolean');

			notice.isRead = false;
			await connection.manager.save(notice);
			const result2 = await noticeRepository.findOne({ id: notice.id });
			assert.equal(typeof result2.isRead, 'boolean');
		});

		it('should isRead auto false', async () => {
			const content = 'content';
			const isRead = undefined;

			const notice = new NoticeEntity();
			notice.content = content;
			notice.isRead = isRead;

			await connection.manager.save(notice);

			const resultNotice = await noticeRepository.findOne({
				id: notice.id,
			});

			assert.equal(resultNotice.isRead, false);
		});
	});

	// describe('relation', () => {
	// 	let notice;
	//
	// 	it('should prepare entity', async () => {
	// 		notice = new NoticeEntity();
	// 		notice.content = 'content';
	//
	// 		await connection.manager.save(notice);
	// 	});
	//
	// 	it('should relate with user entity', async () => {
	// 		const user = UserFactory.build();
	// 		await connection.manager.save(user);
	//
	// 		user.notices = [notice];
	// 		await connection.manager.save(user);
	//
	// 		notice.user = user;
	// 		await connection.manager.save(notice);
	//
	// 		const resultUserSetting = await noticeRepository.findOne({
	// 			where: { id: notice.id },
	// 			relations: ['user'],
	// 		});
	//
	// 		assert.equal(resultUserSetting.user.id, user.id);
	// 	});
	// });
});
