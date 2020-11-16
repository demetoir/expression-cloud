import { assert } from 'chai';
import { EditHistoryEntity } from './edit-history.entity';
import { UserFactory } from 'test/user/user/user.factory';
import { Connection, Repository } from 'typeorm';
import { getConnectionForTest } from 'test/util/typeorm';

const database = 'entity_history_entity';
describe('editHistory entity', () => {
	let editHistoryRepository: Repository<EditHistoryEntity>;
	let connection: Connection;

	beforeAll(async () => {
		connection = await getConnectionForTest(database);

		editHistoryRepository = connection.getRepository(EditHistoryEntity);
	});

	afterAll(async () => {
		await connection.close();
	});

	it('should able to get repository from connection manager', function () {
		assert.isNotNull(editHistoryRepository);
	});

	it('should create new expression', async function () {
		const editHistoryEntity = new EditHistoryEntity();
		editHistoryEntity.editType = 1;
		await connection.manager.save(editHistoryEntity);

		const newEntity = await editHistoryRepository.findOne({
			id: editHistoryEntity.id,
		});

		assert.equal(newEntity.id, editHistoryEntity.id);
	});

	describe('relation', () => {
		let editHistory;

		it('should prepare entity', async () => {
			editHistory = new EditHistoryEntity();
			editHistory.editType = 1;

			await connection.manager.save(editHistory);
		});

		it('should relate with user entity', async () => {
			const user = UserFactory.build();
			await connection.manager.save(user);

			user.editHistories = [editHistory];
			await connection.manager.save(user);

			editHistory.user = user;
			await connection.manager.save(editHistory);

			const result = await editHistoryRepository.findOne({
				where: { id: editHistory.id },
				relations: ['user'],
			});

			assert.equal(result.user.id, user.id);
		});

		it('should relate with self on prev, next ', async () => {
			const prevHistory = new EditHistoryEntity();
			prevHistory.editType = 1;
			await connection.manager.save(prevHistory);

			editHistory.prev = prevHistory;
			await connection.manager.save(editHistory);

			const result = await editHistoryRepository.findOne({
				where: { id: editHistory.id },
				relations: ['prev'],
			});

			assert.equal(result.prev.id, prevHistory.id);
		});
	});
});
