import { assert } from 'chai';
import { createConnection } from 'typeorm';
import { config } from '../../../ormconfig.js';
import { UserEntity } from './user.entity';
import { NoticeEntity } from './notice.entity';

describe('notice entity', () => {
	let userRepository;
	let connection;
	let noticeRepository;

	beforeAll(async () => {
		connection = await createConnection(config);
		await connection.synchronize();

		userRepository = connection.getRepository(UserEntity);
		noticeRepository = connection.getRepository(NoticeEntity);
	});

	afterAll(async () => {
		connection.close();
	});

	it('should able to get repository from connection manager', function () {
		assert.isNotNull(userRepository);
		assert.isNotNull(noticeRepository);
	});

	it('should create new project', async function () {
		const notice = new NoticeEntity();
		notice.content = 'content';
		await connection.manager.save(notice);

		const newContent = await noticeRepository.findOne({ id: notice.id });

		assert.isNotNull(newContent);
	});

	describe('column type check', () => {
		it('should not null on content', async function () {
			try {
				const content = null;
				const notice = new NoticeEntity();
				notice.content = content;

				await connection.manager.save(notice);

				assert(false, 'should throw this error');
			} catch (e) {
				assert.equal(
					e.message,
					'SQLITE_CONSTRAINT: NOT NULL constraint failed: notice.content',
				);
			}
		});

		it('should not null on isRead', async function () {
			try {
				const content = 'content';
				const isRead = null;

				const notice = new NoticeEntity();
				notice.content = content;
				notice.isRead = isRead;

				await connection.manager.save(notice);

				assert(false, 'should throw this error');
			} catch (e) {
				assert.equal(
					e.message,
					'SQLITE_CONSTRAINT: NOT NULL constraint failed: notice.is_read',
				);
			}
		});

		it('should be boolean type of isRead', async function () {
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

		it('should isRead auto false', async function () {
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

	describe('relation', () => {
		let notice;

		it('should prepare notice', async () => {
			notice = new NoticeEntity();
			notice.content = 'content';

			await connection.manager.save(notice);
		});

		it('should relate with user entity', async () => {
			const user = new UserEntity();
			user.name = 'user';
			user.description = 'description';
			user.email = 'email';
			await connection.manager.save(user);

			user.notices = [notice];
			await connection.manager.save(user);

			notice.user = user;
			await connection.manager.save(notice);

			const resultUserSetting = await noticeRepository.findOne({
				where: { id: notice.id },
				relations: ['user'],
			});

			assert.equal(resultUserSetting.user.id, user.id);
		});
	});
});
